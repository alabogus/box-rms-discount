import { useState } from 'react';
import { getFromStorage, saveToStorage } from '@/lib/utils';

/**
 * Custom hook for localStorage management
 * Based on patterns from box-dashboard prototype
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prevValue: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    return getFromStorage(key, initialValue);
  });

  const setValue = (value: T | ((prevValue: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      saveToStorage(key, valueToStore);
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}