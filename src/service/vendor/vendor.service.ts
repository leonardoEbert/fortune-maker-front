import AxiosService from '@/common/axios.service'
import type { PaginatedResponse } from '@/types/paginated-response.type'
import type { RequestPaginationParams } from '@/model/http/request-pagination-params.model'
import type { Vendor } from '@/model/vendor/vendor.model'

export class VendorService {
  private readonly axiosInstance = AxiosService;

  constructor() {
    this.axiosInstance = AxiosService;
  }

  public async getVendorsByPage(paginationParams: RequestPaginationParams) {
    return await this.axiosInstance.get<PaginatedResponse<Vendor>>('/vendor/paginated', { params: paginationParams });
  }
}