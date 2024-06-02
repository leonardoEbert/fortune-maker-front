import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    expiresAt: localStorage.getItem('expiresAt') || Date.now(),
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
      this.expiresAt = Date.now();
      localStorage.removeItem('token');
      localStorage.setItem('isLoggedIn', `${this.isLoggedIn}`);
      localStorage.removeItem('expiresAt');
    },
    setExpiration(expiresAt: number) {
      this.expiresAt = expiresAt;
      localStorage.setItem('expiresAt', `${this.expiresAt}`);
    }
  },
});