import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const name = ref('Гість')
  const isLoggedIn = ref(false)
  const loginTime = ref<string | null>(null)


  const profileData = ref<any>(null)
  const isLoading = ref(false)

  const welcomeMessage = computed(() => `Вітаємо, ${name.value}!`)

  function login(userName: string) {
    name.value = userName
    isLoggedIn.value = true
    loginTime.value = new Date().toLocaleTimeString()
  }

  function logout() {
    name.value = 'Гість'
    isLoggedIn.value = false
    loginTime.value = null
    profileData.value = null
  }

  async function fetchProfile() {
    isLoading.value = true
    try {
      const response = await $fetch('https://api.github.com/users/octocat')
      profileData.value = response
    } catch (error) {
      console.error('Помилка завантаження профілю:', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    name,
    isLoggedIn,
    loginTime,
    welcomeMessage,
    login,
    logout,
    profileData,
    isLoading,
    fetchProfile
  }
})
