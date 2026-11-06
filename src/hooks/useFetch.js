import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Загальний хук для завантаження даних.
 * Не прив'язаний до конкретного API — приймає функцію запиту.
 *
 * ВАЖЛИВО: fetchFn має бути стабільною (useMemo / useCallback),
 * інакше дані перезавантажуватимуться на кожному рендері.
 *
 * Старі відповіді ігноруються: якщо під час очікування стартував
 * новіший запит (або компонент розмонтовано), результат відкидається.
 *
 * @param {Function} fetchFn - асинхронна функція, що повертає дані
 * @returns {{ data: *, loading: boolean, error: string|null, reload: Function }}
 */
export function useFetch(fetchFn) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // лічильник запитів: актуальним вважається лише останній
  const requestId = useRef(0);

  const load = useCallback(async () => {
    const id = ++requestId.current;

    setLoading(true);
    setError(null);

    try {
      const result = await fetchFn();
      if (id !== requestId.current) return; // застаріла відповідь
      setData(result);
    } catch (err) {
      if (id !== requestId.current) return;
      setError(err.message || "Сталася помилка при завантаженні");
    } finally {
      if (id === requestId.current) {
        setLoading(false);
      }
    }
  }, [fetchFn]);

  useEffect(() => {
    load();

    // при розмонтуванні або зміні fetchFn робимо поточний запит неактуальним
    return () => {
      requestId.current += 1;
    };
  }, [load]);

  return { data, loading, error, reload: load };
}