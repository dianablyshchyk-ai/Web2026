<script setup>
import { ref, computed } from 'vue'

useHead({
  title: 'Список продуктів',
  link: [
    { rel: 'stylesheet', href: 'https://site-assets.fontawesome.com/releases/v6.5.1/css/all.css' }
  ]
})

const billingCycle = ref('annual')
const { data: rawProducts } = await useFetch('/api/products')

const goToCheckout = () => {
  console.log('Button clicked, but navigation is disabled.')
}

const products = computed(() => {
  if (!rawProducts.value) return []

  return rawProducts.value.map(item => {
    const currentPricePlan = item[billingCycle.value]

    return {
      slug: item.slug,
      title: currentPricePlan.title,
      price: currentPricePlan.price,
      fullPrice: currentPricePlan.fullPrice,
      oldPrice: currentPricePlan.oldPrice,
      savings: currentPricePlan.savings,
      buttonText: item.buttonText,
      features: item.features
    }
  })
})
</script>

<template>
  <div class="bg-gray-200 flex flex-col items-center min-h-screen p-4 font-sans text-slate-800">

    <div class="w-full max-w-6xl flex justify-center mb-10 mt-6">
      <div class="flex border border-gray-300 rounded-md overflow-hidden bg-gray-50/50 p-0.5 shadow-sm">
        <div class="flex items-center px-4 py-1.5 bg-white shadow-sm text-gray-700 rounded-sm font-semibold text-xs cursor-default">
          <i class="fa-light fa-grid mr-2 text-sm text-blue-500"></i> Card
        </div>
        <NuxtLink to="/table" class="flex items-center px-4 py-1.5 text-gray-500 font-semibold text-xs hover:bg-white hover:text-gray-700 transition-all cursor-pointer">
          <i class="fa-light fa-table mr-2 text-sm"></i> Table
        </NuxtLink>
      </div>
    </div>

    <div class="w-full max-w-5xl flex flex-wrap items-center justify-between mb-8 px-4">
      <h1 class="text-2xl font-bold">Start Your 3 Day Free Trial</h1>

      <div class="flex items-center gap-2">
        <div v-if="billingCycle === 'annual'" class="flex items-center gap-1 mb-1 animate-pulse">
          <span class="text-[11px] text-green-600 font-semibold italic whitespace-nowrap">Save up to 20%</span>
          <img src="https://api.iconify.design/lucide:undo-2.svg?color=%2316a34a"
               class="w-4 h-4 rotate-[150deg] scale-y-[-1] mt-1" alt="arrow">
        </div>

        <div class="relative bg-white/50 border border-gray-300 p-1 rounded-lg flex shadow-sm w-[180px] h-[38px]">
          <div
            class="absolute top-1 bottom-1 transition-all duration-300 bg-white border border-gray-200 shadow-sm rounded-md"
            :style="{ left: billingCycle === 'annual' ? '4px' : '90px', width: '86px' }"
          ></div>
          <button @click="billingCycle = 'annual'" class="relative z-10 flex-1 text-[12px] font-bold cursor-pointer"
                  :class="billingCycle === 'annual' ? 'text-slate-800' : 'text-gray-400'">Annual</button>
          <button @click="billingCycle = 'monthly'" class="relative z-10 flex-1 text-[12px] font-bold cursor-pointer"
                  :class="billingCycle === 'monthly' ? 'text-slate-800' : 'text-gray-400'">Monthly</button>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap justify-center gap-6 max-w-6xl w-full items-stretch pb-20">
      <div v-for="item in products" :key="item.title"
           class="bg-white w-[320px] rounded-2xl transition-all duration-300 border border-transparent hover:border-gray-300 shadow-md flex flex-col overflow-hidden">

        <div class="h-1.5 w-full bg-gradient-to-r from-green-400 to-blue-400"></div>

        <div class="p-6 flex flex-col h-full">
          <h2 class="text-lg font-bold text-gray-800 leading-tight">{{ item.title }}</h2>

          <div class="mt-2 mb-2">
            <span class="inline-block bg-gray-100 text-gray-500 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              3-days free then:
            </span>
          </div>

          <div class="mt-1 flex items-baseline">
            <span class="text-2xl font-semibold text-gray-800 mr-0.5">$</span>
            <span class="text-3xl font-bold text-gray-800 tracking-tighter">{{ item.price }}</span>
            <span class="text-gray-400 ml-1 font-medium text-sm">/month</span>
          </div>

          <p v-if="item.oldPrice" class="text-[11px] text-gray-400 mb-1">
            billed yearly at <span class="line-through text-gray-300">${{ item.fullPrice }}</span>
            <span class="font-medium text-gray-500"> ${{ item.oldPrice }}</span>
          </p>
          <p v-else class="text-[11px] text-transparent mb-1 select-none">Placeholder</p>

          <div v-if="item.savings !== '0'" class="self-start bg-green-50 text-green-600 text-[10px] font-bold px-2 py-0.5 rounded mb-4">
            ${{ item.savings }} in savings
          </div>
          <div v-else class="h-5 mb-4"></div>

          <div class="flex justify-center mb-6">
            <button @click="goToCheckout"
                    class="w-full py-2.5 px-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-slate-800 text-[13px] font-bold rounded-md shadow-sm transition-all uppercase tracking-wide cursor-pointer">
              {{ item.buttonText }}
            </button>
          </div>

          <div class="h-px w-[140px] mx-auto bg-gray-100 mb-6"></div>

          <ul class="space-y-3 flex-grow">
            <li v-for="feature in item.features" :key="feature.main" class="flex items-start">
              <img src="https://api.iconify.design/iconoir:spark-solid.svg?color=%23bef264"
                   class="w-4 h-4 mt-0.5 mr-2 shrink-0" alt="sparkle">
              <div>
                <p class="text-[12px] text-gray-700 font-medium leading-tight">{{ feature.main }}</p>
                <p v-if="feature.sub" class="text-[10px] text-gray-400 mt-0.5">{{ feature.sub }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
