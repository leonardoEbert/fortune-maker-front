import type { VendorClassification } from '@/model/vendor/vendor-classification.model'

export class Vendor {
  id: string = '';
  name: string = '';
  description: string = '';
  isActive: boolean = false;
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  deletedAt?: Date;
  classifications?: VendorClassification[] = [];
}