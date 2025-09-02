/**
 * Type definitions for the RMS Dashboard
 * Based on patterns from box-dashboard prototype
 */

// Base types
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Stock/Inventory types
export interface StockItem extends BaseEntity {
  name: string;
  description?: string;
  category: string;
  quantity: number;
  unit: string;
  reorderLevel: number;
  price: number;
  supplier?: string;
  image?: string;
  status: 'Available' | 'Low Quantity' | 'Out of Stock';
}

export interface StockCategory {
  id: string;
  name: string;
  description?: string;
  color?: string;
}

// Supplier types
export interface Supplier extends BaseEntity {
  name: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  status: 'Active' | 'Inactive';
}

// Transaction types
export interface Transaction extends BaseEntity {
  type: 'Purchase' | 'Usage' | 'Adjustment';
  stockItemId: string;
  quantity: number;
  unitPrice?: number;
  totalAmount?: number;
  notes?: string;
  reference?: string;
  supplierId?: string;
}

// User types (for future authentication)
export interface User extends BaseEntity {
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Staff';
  avatar?: string;
  status: 'Active' | 'Inactive';
}

// UI State types
export interface TableSortState {
  column: string;
  direction: 'asc' | 'desc';
}

export interface FilterState {
  search: string;
  category: string;
  status: string;
  dateRange?: {
    from: Date;
    to: Date;
  };
}

// Form types
export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'select' | 'textarea' | 'date';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}

export interface FormState<T = any> {
  data: T;
  errors: Record<string, string>;
  isSubmitting: boolean;
  isValid: boolean;
}

// Navigation types
export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  children?: NavigationItem[];
}

// Dashboard widget types
export interface DashboardWidget {
  id: string;
  title: string;
  type: 'metric' | 'chart' | 'list' | 'table';
  data: any;
  size: 'sm' | 'md' | 'lg' | 'xl';
  refreshInterval?: number;
}

export interface MetricWidget extends DashboardWidget {
  type: 'metric';
  data: {
    value: string | number;
    label: string;
    change?: {
      value: number;
      type: 'increase' | 'decrease';
      period: string;
    };
    icon?: React.ComponentType<{ className?: string }>;
  };
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Event types
export interface AuditLog extends BaseEntity {
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  changes?: Record<string, { from: any; to: any }>;
  ipAddress?: string;
  userAgent?: string;
}

// Notification types
export interface Notification extends BaseEntity {
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  userId?: string;
  actionUrl?: string;
}

// Theme types
export interface ThemeConfig {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
  border: string;
  radius: string;
}

// Component prop types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface StatusBadgeProps extends BaseComponentProps {
  status: string;
  variant?: 'default' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export interface DataTableProps<T> extends BaseComponentProps {
  data: T[];
  columns: {
    key: keyof T;
    label: string;
    sortable?: boolean;
    render?: (value: any, row: T) => React.ReactNode;
  }[];
  onSort?: (column: string, direction: 'asc' | 'desc') => void;
  onRowClick?: (row: T) => void;
  loading?: boolean;
  emptyMessage?: string;
}