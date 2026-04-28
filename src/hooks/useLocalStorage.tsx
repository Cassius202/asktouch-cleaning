import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Always start with initialValue — matches SSR output exactly
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only runs on client, after hydration
    setMounted(true);
    try {
      const item = window.localStorage.getItem(key);
      if (item) setStoredValue(JSON.parse(item));
    } catch {
      console.warn(`useLocalStorage: failed to read "${key}"`);
    }
  }, [key]);

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch {
      console.warn(`useLocalStorage: failed to write "${key}"`);
    }
  };

  return [mounted ? storedValue : initialValue, setValue] as const;
}