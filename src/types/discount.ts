export interface Discount {
  id: string;
  name: string;
  percentage: number;
  isActive: boolean;
  promoCode?: string;
  maxAmount?: number;
  allowedRoles?: string[];
  validityPeriod?: {
    from: Date;
    to: Date;
  };
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
  maxAmount: number;
  dailyLimit?: number;
}