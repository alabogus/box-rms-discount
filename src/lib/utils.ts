import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Shadcn utility for conditional class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Custom utility functions for the RMS Dashboard
 * Based on patterns from box-dashboard prototype
 */

// Currency formatting (Nepali/Indian style)
export function formatNepaliCurrency(amount: number): string {
  // Convert number to Indian numbering system with Nepali rupee symbol
  const formatter = new Intl.NumberFormat('ne-NP', {
    style: 'currency',
    currency: 'NPR',
    minimumFractionDigits: 2,
  });
  
  return formatter.format(amount).replace('NPR', 'रु');
}

// Alternative simpler version
export function formatCurrency(amount: number): string {
  return `रु ${amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
}

// Date formatting
export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short', 
    day: 'numeric'
  });
}

export function formatDateTime(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// String utilities
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function truncate(str: string, length: number = 50): string {
  return str.length > length ? str.substring(0, length) + '...' : str;
}

// Status utilities
export function getStatusBadgeClass(status: string): string {
  const statusMap: Record<string, string> = {
    'Available': 'bg-green-100 text-green-800 hover:bg-green-100',
    'Active': 'bg-green-100 text-green-800 hover:bg-green-100', 
    'Low Quantity': 'bg-orange-100 text-orange-800 hover:bg-orange-100',
    'Warning': 'bg-orange-100 text-orange-800 hover:bg-orange-100',
    'Out of Stock': 'bg-red-100 text-red-800 hover:bg-red-100',
    'Inactive': 'bg-red-100 text-red-800 hover:bg-red-100',
    'Pending': 'bg-blue-100 text-blue-800 hover:bg-blue-100',
    'Draft': 'bg-gray-100 text-gray-800 hover:bg-gray-100',
  };
  
  return statusMap[status] || 'bg-gray-100 text-gray-800 hover:bg-gray-100';
}

// Form validation utilities
export function isRequired(value: string | undefined | null): boolean {
  return value !== undefined && value !== null && value.trim() !== '';
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  // Basic phone validation for Nepali numbers
  const phoneRegex = /^(\+977|977|0)?[0-9]{9,10}$/;
  return phoneRegex.test(phone.replace(/\s+/g, ''));
}

// Search and filter utilities
export function searchItems<T>(
  items: T[], 
  searchTerm: string, 
  searchFields: (keyof T)[]
): T[] {
  if (!searchTerm.trim()) return items;
  
  const lowerSearchTerm = searchTerm.toLowerCase();
  
  return items.filter(item =>
    searchFields.some(field => {
      const fieldValue = item[field];
      return String(fieldValue).toLowerCase().includes(lowerSearchTerm);
    })
  );
}

export function filterByCategory<T extends { category?: string }>(
  items: T[],
  category: string
): T[] {
  if (category === 'all' || !category) return items;
  return items.filter(item => item.category === category);
}

// ID generation
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Local storage utilities (for prototype data persistence)
export function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error);
    return defaultValue;
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving to localStorage key "${key}":`, error);
  }
}

export function removeFromStorage(key: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage key "${key}":`, error);
  }
}

// Array utilities
export function sortBy<T>(
  items: T[], 
  key: keyof T, 
  direction: 'asc' | 'desc' = 'asc'
): T[] {
  return [...items].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    
    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });
}

// Debounce utility for search
export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}