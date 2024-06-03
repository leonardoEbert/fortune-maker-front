import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import GeneralConfigView from '@/views/GeneralConfigView.vue'
import { AuthService } from '@/service/auth/auth.service'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'config',
          name: 'config',
          component: GeneralConfigView
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ]
})

router.beforeEach((to) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && (authStore.isLoggedIn === 'false')) return '/login'
})

router.isReady().then(() => {
  const authService = new AuthService();
  const authStore = useAuthStore()

  if (authStore.token) {
    authService.checkToken(authStore.token)
  }
})

export default router
