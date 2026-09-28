import { useState, useEffect, useCallback } from 'react';

/**
 * Загальний хук для завантаження даних.
 * Не прив'язаний до конкретного API — приймає функцію запиту.
 *
 * @param {Function} fetchFn - асинхронна функція, що повертає дані
 * @param {Array} deps - залежності, при зміні яких треба перезавантажити дані
 * @returns {{ data: *, loading: boolean, error: string|null, reload: Function }}
 */
export function useFetch(fetchFn, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      setError(err.message || "Сталася помилка при завантаженні");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, reload: load };
}