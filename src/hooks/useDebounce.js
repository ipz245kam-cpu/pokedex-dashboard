import { useState, useEffect } from 'react';

/**
 * Повертає debounced-версію значення.
 * Корисно для полів пошуку/фільтрів, щоб не робити запит на кожне натискання.
 *
 * @param {*} value - значення, яке потрібно "затримати"
 * @param {number} delay - затримка в мілісекундах (за замовчуванням 400)
 * @returns {*} debounced-значення, яке оновлюється лише після паузи введення
 */
export function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timerId);
    };
  }, [value, delay]);

  return debouncedValue;
}