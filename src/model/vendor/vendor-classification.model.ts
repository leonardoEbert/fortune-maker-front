export class VendorClassification {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  parentClassification: VendorClassification;
  subClassification: VendorClassification[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}