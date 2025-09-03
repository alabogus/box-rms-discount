export interface Discount {
  id: string;
  name: string;
  percentage: number;
  description: string;
  isActive: boolean;
}

export interface CustomDiscount {
  id: string;
  userId: string;
  orderId: string;
  percentage: number;
  reason?: string;
  createdAt: Date;
}

export interface UserRole {
  id: string;
  roleName: string;
  maxDiscountPercentage: number;
}

export interface DiscountLimit {
  roleId: string;
  roleName: string;
  maxPercentage: number;
}