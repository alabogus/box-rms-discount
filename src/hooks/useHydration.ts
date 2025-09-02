import { useState, useEffect } from 'react';

/**
 * Custom hook to handle hydration mismatches
 * Based on patterns from box-dashboard prototype
 */
export function useHydration() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
}