export interface Discount {
  id: string;
  name: string;
  percentage: number;
  isActive: boolean;
  promoCode?: string;
  maxAmount?: number;
  allowedRoles?: string[];
  type: 'simple' | 'event' | 'complex';
  validityPeriod?: {
    from: Date;
    to: Date;
  };
  schedule?: DiscountSchedule;
}

export interface DiscountSchedule {
  type: 'always' | 'date_range' | 'recurring';
  daySchedules?: DaySchedule[];
}

export interface TimeSlot {
  id: string;
  startTime: string; // "07:00"
  endTime: string; // "10:00"
}

export interface DaySchedule {
  dayOfWeek: number; // 0=Sunday, 1=Monday, ..., 6=Saturday
  enabled: boolean;
  timeSlots: TimeSlot[];
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