import type { VendorClassification } from '@/model/vendor/vendor-classification.model'

export class CreateVendorClassificationDto {
  name: string = '';
  description: string = '';
  isActive: boolean = false;
  parentClassificationId?: VendorClassification;
}