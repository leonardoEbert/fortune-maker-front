import AxiosService from '@/common/axios.service'
import type { LoginDto } from '@/dto/login.dto'
import { useAuthStore } from '@/stores/auth'
import type { AuthData } from '@/model/AuthData.model'

export class AuthService {
  private readonly axiosInstance = AxiosService;

  constructor() {
    this.axiosInstance = AxiosService;
  }

  public checkToken(token: string) {
    this.axiosInstance.post<boolean>('/auth/check-token', { token })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        const authStore = useAuthStore();
        authStore.clearToken()
        console.log(error)
      })

  }

  public async tryLogin(loginData: LoginDto) {
    this.axiosInstance.post<AuthData>('/auth/login', loginData)
      .then((response) => {
        const authStore = useAuthStore()
        authStore.setToken(response.accessToken, loginData.remember)
        authStore.setExpiration(response.expiresAt)
      })
      .catch((error) => {
        console.error(error)
      })
  }
}