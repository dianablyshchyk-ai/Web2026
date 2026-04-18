<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/useUserStore'

const userStore = useUserStore()
const { name, isLoggedIn, welcomeMessage, profileData, isLoading } = storeToRefs(userStore)

const inputName = ref('')

const handleLogin = () => {
  if (inputName.value) {
    userStore.login(inputName.value)
    inputName.value = ''
  }
}
</script>

<template>
  <div class="container">
    <h1>{{ welcomeMessage }}</h1>

    <div v-if="!isLoggedIn">
      <input v-model="inputName" placeholder="Введіть ваше ім'я" />
      <button @click="handleLogin">Увійти</button>
    </div>

    <div v-else>
      <p>Ви зайшли о: {{ userStore.loginTime }}</p>
      <button @click="userStore.logout">Вийти</button>

      <hr style="margin: 20px 0;" />

      <h3>Тест асинхронного запиту:</h3>
      <button @click="userStore.fetchProfile" :disabled="isLoading">
        {{ isLoading ? 'Завантаження...' : 'Завантажити профіль GitHub' }}
      </button>

      <div v-if="profileData" class="profile-card">
        <img :src="profileData.avatar_url" alt="Аватар" width="100" />
        <p><strong>Логін:</strong> {{ profileData.login }}</p>
        <p><strong>Ім'я:</strong> {{ profileData.name || 'Не вказано' }}</p>
        <p><strong>Підписників:</strong> {{ profileData.followers }}</p>
      </div>

    </div>
  </div>
</template>

<style scoped>
.container { padding: 2rem; font-family: sans-serif; }
button { margin-left: 0.5rem; cursor: pointer; padding: 5px 10px; }
.profile-card { margin-top: 15px; padding: 15px; border: 1px solid #ccc; border-radius: 8px; max-width: 300px; }
</style>
