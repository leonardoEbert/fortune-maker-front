import AxiosService from '@/common/axios.service'
import type { VendorClassification } from '@/model/vendor/vendor-classification.model'

export class ClassificationService {
  private readonly axiosInstance = AxiosService;

  constructor() {
    this.axiosInstance = AxiosService;
  }

  public async getClassificationList() {
    const classificationList = await this.axiosInstance.get<VendorClassification[]>('/classification');

    return classificationList;
  }
}