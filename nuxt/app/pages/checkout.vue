<script setup>
import { ref, computed } from 'vue'

const route = useRoute()
const planSlug = route.query.plan || 'starter'
const cycle = route.query.cycle || 'annual'

const { data: products } = await useFetch('/api/products')

const selectedPlan = computed(() => {
  if (!products.value) return null
  const product = products.value.find(p => p.slug === planSlug)
  if (!product) return null
  const pricing = product[cycle]
  return { ...pricing, features: product.features }
})

useHead({
  title: computed(() => `Checkout - ${selectedPlan.value?.title || 'Subscription'}`)
})


const formattedDate = computed(() => {
  const date = new Date();
  date.setDate(date.getDate() + 3);
  return date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });
});

const form = ref({
  fullCard: '',
  fullName: 'dev4 dev4',
  address: '',
  consent: false
})

const formatCardInput = (e) => {
  let value = e.target.value.replace(/\D/g, '')
  let formatted = ''

  if (value.length > 0) {
    const number = value.substring(0, 16)
    const parts = number.match(/.{1,4}/g) || []
    formatted = parts.join(' ')

    if (value.length > 16) {
      const date = value.substring(16, 20)
      formatted += '  ' + (date.length > 2 ? date.substring(0, 2) + ' / ' + date.substring(2) : date)

      if (value.length > 20) {
        const cvc = value.substring(20, 23)
        formatted += '   ' + cvc
      }
    }
  }
  form.value.fullCard = formatted
}

const isSubmitting = ref(false)

const handlePayment = async () => {
  if (!form.value.consent) return
  isSubmitting.value = true
  try {
    const priceToSubmit = selectedPlan.value.oldPrice || selectedPlan.value.price;
    await $fetch('/api/subscription/create', {
      method: 'POST',
      body: {
        plan: selectedPlan.value.title,
        price: priceToSubmit,
        billingCycle: cycle,
        trialEnds: formattedDate.value,
        ...form.value
      }
    })
    alert('Вітаємо! Ваш 3-денний пробний період розпочато.')
    navigateTo('/')
  } catch (e) { alert('Помилка при створенні підписки') } finally { isSubmitting.value = false }
}
</script>

<template>
  <div class="bg-gray-100 min-h-screen font-sans text-slate-800 pb-6">
    <header class="bg-slate-800 text-white py-2.5 text-center font-bold text-base shadow-sm mb-4">
      Checkout
    </header>

    <div class="max-w-5xl mx-auto px-4">
      <NuxtLink to="/" class="text-gray-400 text-xs hover:text-gray-600 mb-2 inline-flex items-center gap-1">
        <i class="fa-light fa-chevrons-left"></i> back
      </NuxtLink>

      <h1 class="text-xl font-extrabold mb-0.5">You're Almost In - Start Your 3-Day Free Trial Now!</h1>
      <p class="text-gray-500 text-xs mb-6">Set up your account to gain instant access!</p>

      <div v-if="selectedPlan" class="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">

        <div class="lg:col-span-4 xl:col-span-4">
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-4">
            <div class="h-1 w-full bg-gradient-to-r from-green-400 to-blue-400"></div>
            <div class="p-5">
              <h2 class="text-lg font-bold mb-0.5">{{ selectedPlan.title }}</h2>
              <p class="text-[9px] text-gray-400 font-bold uppercase mb-3 tracking-wider">3-days free then:</p>

              <div class="flex items-baseline mb-1">
                <span class="text-xl font-bold mr-0.5">$</span>
                <span class="text-3xl font-black">{{ selectedPlan.price }}</span>
                <span class="text-gray-400 text-xs ml-1">/month</span>
              </div>

              <p v-if="selectedPlan.oldPrice" class="text-[10px] text-gray-400 mb-3 leading-tight">
                billed yearly at <span class="line-through text-gray-300">${{ selectedPlan.fullPrice }}</span>
                <span class="text-gray-500 font-semibold"> ${{ selectedPlan.oldPrice }}</span>
              </p>

              <div v-if="selectedPlan.savings !== '0'" class="bg-green-50 text-green-600 text-[10px] font-bold px-1.5 py-0.5 rounded inline-block mb-4">
                ${{ selectedPlan.savings }} in savings
              </div>

              <div class="h-px bg-gray-100 w-[120px] mx-auto mb-5"></div>

              <ul class="space-y-3">
                <li v-for="f in selectedPlan.features" :key="f.main" class="flex items-start gap-2.5">
                  <img src="https://api.iconify.design/iconoir:spark-solid.svg?color=%23bef264" class="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  <div>
                    <p class="text-[12px] font-bold text-gray-700 leading-tight">{{ f.main }}</p>
                    <p v-if="f.sub" class="text-[10px] text-gray-400 mt-0.5 leading-tight">{{ f.sub }}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="lg:col-span-8 xl:col-span-7">
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 max-w-[580px]">
            <h3 class="text-base font-bold mb-4 tracking-tight">Order Summary</h3>

            <div class="space-y-3 mb-5 pb-4 text-sm">
              <div class="flex justify-between text-gray-600 font-medium">
                <span>{{ selectedPlan.title }} Plan</span>
                <span class="text-slate-800 font-bold">${{ selectedPlan.oldPrice || selectedPlan.price }}</span>
              </div>

              <div class="h-px bg-gray-100 w-full my-2"></div>

              <div class="flex justify-between items-center text-xs">
                <span class="text-gray-400 underline decoration-dotted">Total Due (*not including tax)</span>
                <span class="font-bold text-slate-800">${{ selectedPlan.oldPrice || selectedPlan.price }}</span>
              </div>
              <div class="flex justify-between items-center pt-1 text-slate-800">
                <span class="font-black text-base underline decoration-dotted">Due Today</span>
                <span class="text-2xl font-black underline decoration-dotted">$0.00</span>
              </div>
            </div>

            <div class="bg-gray-50 border border-gray-100 rounded-lg py-2 text-center mb-6 font-bold text-gray-400 text-[10px] uppercase tracking-wide">
              Includes 3-Day Free Trial
            </div>

            <div class="space-y-5">
              <h3 class="text-sm font-bold flex items-center gap-1.5 mb-2">
                Billing Information <i class="fa-light fa-circle-info text-gray-300 text-xs cursor-help"></i>
              </h3>

              <div class="space-y-4">
                <div>
                  <label class="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 ml-1">Card Details</label>
                  <div class="relative flex items-center bg-white border border-gray-200 rounded-lg focus-within:ring-1 focus-within:ring-orange-400 overflow-hidden h-10 shadow-sm">
                    <i class="fa-light fa-credit-card absolute left-3.5 text-gray-400 text-base"></i>
                    <input
                      :value="form.fullCard"
                      @input="formatCardInput"
                      type="text"
                      placeholder="Number                  MM / YY          CVC"
                      class="w-full pl-11 pr-4 py-2 bg-transparent outline-none text-sm placeholder:text-gray-200 font-mono tracking-wider"
                    />
                  </div>
                </div>

                <div class="space-y-3">
                  <div>
                    <label class="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 ml-1">Full name</label>
                    <input v-model="form.fullName" type="text" class="w-full px-3.5 py-2.5 bg-gray-100 border border-gray-200 rounded-lg outline-none text-sm focus:bg-white transition-colors" />
                  </div>
                  <div>
                    <label class="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 ml-1">Address</label>
                    <input v-model="form.address" type="text" placeholder="Street, City, Country" class="w-full px-3.5 py-2.5 bg-gray-100 border border-gray-200 rounded-lg outline-none text-sm focus:bg-white transition-colors" />
                  </div>
                </div>
              </div>

              <div class="flex items-start gap-3 pt-2">
                <input v-model="form.consent" type="checkbox" id="consent" class="mt-0.5 w-4 h-4 accent-slate-800 cursor-pointer" />
                <label for="consent" class="text-[10px] text-gray-500 leading-snug cursor-pointer select-none">
                  I consent to the <a href="#" class="font-bold text-slate-800 underline">Terms of Use</a> and understand my 3-day free trial will automatically convert to a paid subscription of
                  <span class="font-bold text-slate-800">${{ selectedPlan.oldPrice || selectedPlan.price }}</span>
                  per {{ cycle }} starting on
                  <span class="font-bold text-slate-800">{{ formattedDate }}</span>.
                  The {{ cycle }} fee will be automatically charged each {{ cycle }} going forward unless I cancel before the trial period ends.
                </label>
              </div>

              <button
                @click="handlePayment"
                :disabled="isSubmitting"
                class="w-full py-3.5 rounded-lg font-black text-base uppercase tracking-wide transition-all shadow-md h-12 flex items-center justify-center"
                :class="form.consent
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 cursor-pointer hover:shadow-orange-200'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'"
              >
                {{ isSubmitting ? 'Processing...' : 'Try It Free' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
