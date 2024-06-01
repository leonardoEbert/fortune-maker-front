import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
  }),
  actions: {
    setToken(newToken: string) {
      this.token = newToken;
      this.isLoggedIn = true;
      localStorage.setItem('token', newToken);
      localStorage.setItem('isLoggedIn', `${this.isLoggedIn}`);
    },
    clearToken() {
      this.token = '';
      this.isLoggedIn = false;
      localStorage.removeItem('token');
      localStorage.setItem('isLoggedIn', `${this.isLoggedIn}`);
    },
  },
});