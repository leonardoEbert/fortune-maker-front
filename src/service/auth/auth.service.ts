import AxiosService from '@/common/axios.service'
import type { LoginDto } from '@/dto/login.dto'
import { useAuthStore } from '@/stores/auth'
import type { AuthData } from '@/model/AuthData.model'

export class AuthService {
  private axiosInstance = AxiosService;

  constructor() {
    this.axiosInstance = AxiosService;
  }

  public checkToken(token: string) {
    console.log(token);
  }

  public async tryLogin(loginData: LoginDto) {
    this.axiosInstance.post<AuthData>('/auth/login', loginData)
      .then((response) => {
        const authStore = useAuthStore()
        authStore.setToken(response.accessToken)
        authStore.setExpiration(response.expiresAt)
      })
      .catch((error) => {
        console.error(error)
      })

  }
}