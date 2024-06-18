import AxiosService from '@/common/axios.service'

export class VendorService {
  private readonly axiosInstance = AxiosService;

  constructor() {
    this.axiosInstance = AxiosService;
  }

  public async getVendorsList() {

  }
}