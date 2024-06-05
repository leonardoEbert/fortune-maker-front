import AxiosService from '@/common/axios.service'
import type { VendorClassification } from '@/model/vendor/vendor-classification.model'
import type { CreateVendorClassificationDto } from '@/dto/vendor/create-vendor-classification.dto'

export class ClassificationService {
  private readonly axiosInstance = AxiosService;

  constructor() {
    this.axiosInstance = AxiosService;
  }

  public async getClassificationList() {
    const classificationList = await this.axiosInstance.get<VendorClassification[]>('/classification');

    const returnList = [];

    for (const vendorClassification of classificationList) {
      const newVendor = {
        value: vendorClassification.id,
        label: vendorClassification.name,
      }

      returnList.push(newVendor);
    }
    return returnList;
  }

  public async createClassification(classification: CreateVendorClassificationDto) {
    return await this.axiosInstance.post<VendorClassification>('/classification', classification);
  }
}