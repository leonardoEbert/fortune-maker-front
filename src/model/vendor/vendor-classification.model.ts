export class VendorClassification {
  id: string = '';
  name: string = '';
  description?: string = '';
  isActive: boolean = false;
  parentClassification?: VendorClassification = {} as VendorClassification;
  subClassifications?: VendorClassification[] = [];
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  deletedAt?: Date;
}