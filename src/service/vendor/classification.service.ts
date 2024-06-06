import AxiosService from '@/common/axios.service'
import type { VendorClassification } from '@/model/vendor/vendor-classification.model'
import type { CreateVendorClassificationDto } from '@/dto/vendor/create-vendor-classification.dto'
import type { VendorClassificationPaginationParams } from '@/model/vendor/vendor-classification-pagination-params.model'
import type { PaginatedResponse } from '@/types/paginated-response.type'

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

  public async getClassificationsCount() {
    return await this.axiosInstance.get<number>('/classification/count');
  }

  public async getClassificationsByPage(paginationParams: VendorClassificationPaginationParams) {
    return await this.axiosInstance.get<PaginatedResponse<VendorClassification>>('/classification/paginated', { params: paginationParams })
  }
}