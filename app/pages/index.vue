<script setup>
import { ref } from 'vue'

useHead({
  title: 'Список продуктів'
})

const billingCycle = ref('annual')
const { data: products } = await useFetch('/api/products')
</script>

<template>
  <div class="bg-gray-200 flex flex-col items-center justify-center min-h-screen p-4 font-sans text-slate-800">

    <div class="w-full max-w-6xl flex flex-wrap items-center justify-between mb-12 px-4">
      <h1 class="text-2xl font-bold">Start Your 3 Day Free Trial</h1>

      <div class="flex items-center gap-2 mt-6 sm:mt-0">

        <div class="flex items-center gap-1 mb-1">
          <span class="text-[11px] text-green-600 font-semibold italic whitespace-nowrap">Save up to 20%</span>
          <img src="https://api.iconify.design/lucide:undo-2.svg?color=%2316a34a"
               class="w-4 h-4 rotate-[150deg] scale-y-[-1] mt-1" alt="arrow pointer">
        </div>

        <div class="relative bg-white/50 border border-gray-300 p-1 rounded-lg flex shadow-sm w-[180px] h-[38px]">
          <div
            class="absolute top-1 bottom-1 transition-all duration-300 bg-white border border-gray-200 shadow-sm rounded-md"
            :style="{
              left: billingCycle === 'annual' ? '4px' : '90px',
              width: '86px'
            }"
          ></div>

          <button
            @click="billingCycle = 'annual'"
            class="relative z-10 flex-1 text-[12px] font-bold transition-colors duration-300 cursor-pointer"
            :class="billingCycle === 'annual' ? 'text-slate-800' : 'text-gray-400'"
          >
            Annual
          </button>
          <button
            @click="billingCycle = 'monthly'"
            class="relative z-10 flex-1 text-[12px] font-bold transition-colors duration-300 cursor-pointer"
            :class="billingCycle === 'monthly' ? 'text-slate-800' : 'text-gray-400'"
          >
            Monthly
          </button>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap justify-center gap-6 max-w-6xl w-full items-stretch pb-10">
      <div v-for="item in products" :key="item.title"
           class="bg-white w-[320px] rounded-2xl transition-all duration-300 border border-transparent hover:border-gray-400 shadow-md flex flex-col overflow-hidden">

        <div class="h-1.5 w-full bg-gradient-to-r from-green-400 to-blue-400"></div>

        <div class="p-6 flex flex-col h-full">
          <h2 class="text-xl font-bold text-gray-800">{{ item.title }}</h2>

          <div class="mt-1 mb-2">
            <span class="inline-block bg-gray-100 text-gray-500 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              3-days free then:
            </span>
          </div>

          <div class="mt-2 flex items-baseline">
            <span class="text-3xl font-semibold text-gray-800 mr-1">$</span>
            <span class="text-3xl font-bold text-gray-800 tracking-tighter">{{ item.price }}</span>
            <span class="text-gray-400 ml-1 font-medium text-base">/month</span>
          </div>

          <p class="text-[12px] text-gray-400 mb-1 leading-tight">
            billed yearly at <span class="line-through text-gray-300">${{ item.fullPrice || '1,188' }}</span>
            <span class="font-medium text-gray-500"> ${{ item.oldPrice }}</span>
          </p>

          <div class="self-start bg-green-50 text-green-600 text-[11px] font-bold px-2 py-0.5 rounded mb-4">
            ${{ item.savings }} in savings
          </div>

          <div class="flex justify-center mb-6">
            <button class="w-[90%] py-2.5 px-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-slate-800 text-[14px] font-bold rounded-md shadow-sm transition-all tracking-wide cursor-pointer uppercase">
              {{ item.buttonText }}
            </button>
          </div>

          <div class="h-px w-[140px] mx-auto bg-gray-100/80 mb-6"></div>

          <ul class="space-y-3 flex-grow">
            <li v-for="feature in item.features" :key="feature.main" class="flex items-start">
              <img src="https://api.iconify.design/iconoir:spark-solid.svg?color=%23bef264"
                   class="w-4 h-4 mt-0.5 mr-2 shrink-0" alt="sparkle">
              <div>
                <p class="text-[13px] text-gray-700 font-medium leading-tight">{{ feature.main }}</p>
                <p v-if="feature.sub" class="text-[11px] text-gray-400 mt-0.5">{{ feature.sub }}</p>
              </div>
            </li>
          </ul>
          <div class="h-4"></div>
        </div>
      </div>
    </div>
  </div>
</template>
