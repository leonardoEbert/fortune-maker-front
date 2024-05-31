import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore =  defineStore('auth', () => {
  const jwtToken = ref('')
  function setJwtToken(token: string) {
    jwtToken.value = token
  }
  function clearJwtToken() {
    jwtToken.value = ''
  }

  return { jwtToken, setJwtToken, clearJwtToken }
})