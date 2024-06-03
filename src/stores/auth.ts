import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    expiresAt: localStorage.getItem('expiresAt') || Date.now(),
    remember: localStorage.getItem('remember') || false,
  }),
  actions: {
    setToken(newToken: string, remember: boolean) {
      this.token = newToken;
      this.isLoggedIn = true;
      this.remember = remember;
      localStorage.setItem('token', newToken);
      localStorage.setItem('isLoggedIn', `${this.isLoggedIn}`);
      localStorage.setItem('remember', `${remember}`);
    },
    clearToken() {
      console.log('clear token');
      this.token = '';
      this.isLoggedIn = false;
      this.expiresAt = Date.now();
      this.remember = false;
      localStorage.removeItem('token');
      localStorage.setItem('isLoggedIn', `${this.isLoggedIn}`);
      localStorage.removeItem('expiresAt');
      localStorage.removeItem('remember');
    },
    setExpiration(expiresAt: number) {
      this.expiresAt = expiresAt;
      localStorage.setItem('expiresAt', `${this.expiresAt}`);
    }
  },
});