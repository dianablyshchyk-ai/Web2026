<script setup>
import { ref, computed } from 'vue'

useHead({
  title: 'Таблиця продуктів'
})

const { data: response, pending } = await useFetch('https://dummyjson.com/products?limit=100')
const products = computed(() => response.value?.products || [])

const columns = [
  { key: 'thumbnail', label: 'Фото' },
  { key: 'title', label: 'Назва', sortable: true },
  { key: 'description', label: 'Опис' },
  { key: 'price', label: 'Ціна', sortable: true },
  { key: 'rating', label: 'Оцінка', sortable: true },
  { key: 'brand', label: 'Бренд' },
  { key: 'category', label: 'Категорія' }
]

const q = ref('')
const page = ref(1)
const pageCount = 10

const filteredRows = computed(() => {
  if (!q.value) return products.value

  return products.value.filter((product) => {
    return Object.values(product).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase())
    })
  })
})

const rows = computed(() => {
  return filteredRows.value.slice((page.value - 1) * pageCount, page.value * pageCount)
})
</script>

<template>
  <div class="bg-gray-100 min-h-screen p-8 font-sans">
    <div class="max-w-7xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">

      <div class="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
        <div class="flex items-center gap-4">
          <div class="flex border rounded-md overflow-hidden bg-gray-50">
            <button class="px-3 py-1 text-xs border-r hover:bg-gray-100 flex items-center gap-1">
              <UIcon name="i-heroicons-squares-2x2" /> Card
            </button>
            <button class="px-3 py-1 text-xs bg-white shadow-inner font-semibold flex items-center gap-1">
              <UIcon name="i-heroicons-list-bullet" /> List
            </button>
          </div>
          <UInput v-model="q" placeholder="Пошук..." icon="i-heroicons-magnifying-glass-20-solid" />
        </div>

        <NuxtLink to="/" class="text-sm text-blue-600 hover:underline">
          Повернутись до карток
        </NuxtLink>
      </div>

      <UTable
        :rows="rows"
        :columns="columns"
        :loading="pending"
        sort-mode="manual"
        class="w-full"
        :ui="{
          thead: 'bg-[#333333]',
          th: {
            base: 'text-white font-semibold uppercase text-xs tracking-wider border-x border-gray-600 first:border-l-0 last:border-r-0',
            color: 'text-white'
          },
          td: {
            base: 'border-b border-gray-100 text-sm py-4'
          }
        }"
      >
        <template #thumbnail-data="{ row }">
          <img :src="row.thumbnail" class="w-[100px] h-[100px] object-cover rounded" alt="product image">
        </template>

        <template #price-data="{ row }">
          <span class="font-bold text-slate-800">${{ row.price }}</span>
        </template>

        <template #rating-data="{ row }">
          <span :class="row.rating < 4.5 ? 'text-red-500 font-bold' : 'text-green-600 font-bold'">
            {{ row.rating }}
          </span>
        </template>

        <template #description-data="{ row }">
          <p class="max-w-xs truncate text-gray-500">{{ row.description }}</p>
        </template>
      </UTable>

      <div class="flex justify-center border-t border-gray-200 px-4 py-4 bg-gray-50">
        <UPagination
          v-model="page"
          :page-count="pageCount"
          :total="filteredRows.length"
          :ui="{ wrapper: 'flex items-center gap-1' }"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(th) {
  text-align: left !important;
}
</style>
