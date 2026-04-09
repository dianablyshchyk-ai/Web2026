<script setup>
import { ref, computed } from 'vue'

useHead({
  title: 'Products API Table',
  link: [
    { rel: 'stylesheet', href: 'https://site-assets.fontawesome.com/releases/v6.5.1/css/all.css' }
  ]
})

const { data } = await useFetch('https://dummyjson.com/products?limit=20')

const properties = computed(() => data.value?.products || [])

const searchQuery = ref('')
const sortColumn = ref('')
const sortAsc = ref(true)
const currentPage = ref(1)
const itemsPerPage = 4

const filteredData = computed(() => {
  if (!searchQuery.value) return properties.value
  const lowerCaseQuery = searchQuery.value.toLowerCase()
  return properties.value.filter(item =>
    (item.title && item.title.toLowerCase().includes(lowerCaseQuery)) ||
    (item.brand && item.brand.toLowerCase().includes(lowerCaseQuery))
  )
})

const sortedData = computed(() => {
  let result = [...filteredData.value]

  if (sortColumn.value) {
    result.sort((a, b) => {
      let valA = a[sortColumn.value]
      let valB = b[sortColumn.value]

      if (valA === undefined || valA === null) valA = ''
      if (valB === undefined || valB === null) valB = ''

      if (typeof valA === 'string') {
        return sortAsc.value ? valA.localeCompare(valB) : valB.localeCompare(valA)
      } else {
        return sortAsc.value ? valA - valB : valB - valA
      }
    })
  }
  return result
})

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return sortedData.value.slice(start, end)
})

const totalPages = computed(() => Math.ceil(sortedData.value.length / itemsPerPage))

const sortBy = (column) => {
  if (sortColumn.value === column) {
    sortAsc.value = !sortAsc.value
  } else {
    sortColumn.value = column
    sortAsc.value = true
  }
  currentPage.value = 1
}
</script>

<template>
  <div class="bg-white min-h-screen font-sans flex flex-col">
    <div class="relative flex items-center justify-between px-6 py-4 border-b border-gray-100">
      <div class="flex items-center space-x-4">
        <input type="checkbox" class="w-5 h-5 rounded border-gray-300 text-blue-600 cursor-pointer accent-blue-600">
        <div class="relative ml-2">
          <i class="fa-light fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          <input
            v-model="searchQuery"
            @input="currentPage = 1"
            type="text"
            placeholder="Search products..."
            class="pl-9 pr-4 py-1.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-blue-500 w-48"
          >
        </div>
      </div>

      <div class="absolute left-1/2 transform -translate-x-1/2 flex border border-gray-200 rounded-md overflow-hidden bg-gray-50/50 p-0.5 shadow-sm">
        <NuxtLink to="/" class="flex items-center px-4 py-1.5 text-gray-400 font-semibold text-xs hover:bg-white hover:text-gray-700 transition-all cursor-pointer">
          <i class="fa-light fa-grid mr-2 text-sm"></i> Card
        </NuxtLink>
        <NuxtLink to="/table" class="flex items-center px-4 py-1.5 bg-white shadow-sm text-gray-700 rounded-sm font-semibold text-xs cursor-default">
          <i class="fa-light fa-table mr-2 text-sm"></i> Table
        </NuxtLink>
      </div>

      <div class="flex items-center space-x-8 text-gray-500 text-sm font-medium">
        <button class="flex items-center hover:text-black transition-colors">
          <i class="fa-light fa-clone mr-2"></i> Display
        </button>
        <button class="flex items-center hover:text-black transition-colors">
          <i class="fa-solid fa-sort-down mr-2 mb-1"></i> Sort by
        </button>
        <button class="flex items-center hover:text-black transition-colors">
          <i class="fa-solid fa-ellipsis-vertical mr-2"></i> Actions
        </button>
      </div>
    </div>

    <div class="w-full overflow-x-auto flex-grow">
      <table class="w-full border-collapse min-w-[1000px]">
        <thead>
        <tr class="bg-[#333333] text-white text-[15px]">
          <th class="py-4 px-4 w-16 border-r border-gray-600"></th>

          <th class="py-4 px-4 text-left font-semibold border-r border-gray-600 w-[120px]">Photo</th>

          <th @click="sortBy('title')" class="py-4 px-6 text-left font-semibold border-r border-gray-600 w-[25%] cursor-pointer hover:bg-gray-700">
            Title <i v-if="sortColumn === 'title'" :class="sortAsc ? 'fa-sort-up' : 'fa-sort-down'" class="fa-solid ml-1"></i>
          </th>

          <th class="py-4 px-6 text-left font-semibold border-r border-gray-600 w-[25%]">Description</th>

          <th @click="sortBy('category')" class="py-4 px-4 text-left font-semibold border-r border-gray-600 cursor-pointer hover:bg-gray-700">
            Category/Brand <i v-if="sortColumn === 'category'" :class="sortAsc ? 'fa-sort-up' : 'fa-sort-down'" class="fa-solid ml-1"></i>
          </th>

          <th @click="sortBy('price')" class="py-4 px-4 text-right font-semibold cursor-pointer border-r border-gray-600 hover:bg-gray-700">
            Price <i v-if="sortColumn === 'price'" :class="sortAsc ? 'fa-sort-up' : 'fa-sort-down'" class="fa-solid ml-1"></i>
          </th>

          <th @click="sortBy('rating')" class="py-4 px-4 text-right font-semibold pr-12 cursor-pointer hover:bg-gray-700">
            Rating <i v-if="sortColumn === 'rating'" :class="sortAsc ? 'fa-sort-up' : 'fa-sort-down'" class="fa-solid ml-1"></i>
          </th>
        </tr>
        </thead>
        <tbody class="text-[14px] text-gray-600 divide-y divide-gray-100">

        <tr v-if="paginatedData.length === 0">
          <td colspan="7" class="py-8 text-center text-gray-400">Loading or No products found.</td>
        </tr>

        <tr v-for="item in paginatedData" :key="item.id" class="hover:bg-gray-50 transition-colors">
          <td class="py-4 px-4 text-center border-r border-gray-100">
            <input type="checkbox" class="w-4 h-4 rounded border-gray-300 accent-blue-600 cursor-pointer">
          </td>

          <td class="py-4 px-4 text-center border-r border-gray-100">
            <img :src="item.thumbnail" :alt="item.title" class="w-[100px] h-[100px] object-cover rounded-md border border-gray-200 bg-white">
          </td>

          <td class="py-4 px-6 border-r border-gray-100">
            <div class="font-bold text-gray-800">{{ item.title }}</div>
          </td>

          <td class="py-4 px-6 border-r border-gray-100">
            <div class="text-xs text-gray-500 line-clamp-3">{{ item.description }}</div>
          </td>

          <td class="py-4 px-4 border-r border-gray-100">
            <div class="font-medium text-gray-700 capitalize">{{ item.category }}</div>
            <div class="text-xs text-gray-400">{{ item.brand || 'No Brand' }}</div>
          </td>

          <td class="py-4 px-4 text-right border-r border-gray-100 font-bold text-gray-800">
            ${{ item.price }}
          </td>

          <td class="py-4 px-4 text-right pr-12 font-bold text-lg">
            <span :class="item.rating < 4.5 ? 'text-red-500' : 'text-green-500'">
              <i class="fa-solid fa-star text-sm mr-1"></i>{{ item.rating }}
            </span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50 mt-auto">
      <div class="text-sm text-gray-500">
        Showing {{ sortedData.length === 0 ? 0 : ((currentPage - 1) * itemsPerPage) + 1 }} to
        {{ Math.min(currentPage * itemsPerPage, sortedData.length) }} of {{ sortedData.length }} results
      </div>

      <div class="flex space-x-1" v-if="totalPages > 1">
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <i class="fa-solid fa-chevron-left text-xs"></i>
        </button>

        <button
          v-for="page in totalPages"
          :key="page"
          v-show="page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1"
          @click="currentPage = page"
          :class="['px-3 py-1 border rounded-md text-sm font-medium transition-colors',
                   currentPage === page ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 text-gray-600 hover:bg-gray-100']"
        >
          {{ page }}
        </button>

        <button
          @click="currentPage++"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <i class="fa-solid fa-chevron-right text-xs"></i>
        </button>
      </div>
    </div>

  </div>
</template>
