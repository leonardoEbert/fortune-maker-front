import AxiosService from '@/common/axios.service'

export class ClassificationService {
  private readonly axiosInstance = AxiosService;

  constructor() {
    this.axiosInstance = AxiosService;
  }

  public async getClassificationList() {
    const classificationList = await this.axiosInstance.get('/classification');

    return classificationList;
  }
}