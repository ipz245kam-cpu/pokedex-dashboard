import { useState, useEffect, useCallback } from "react";

/**
 * Загальний хук для завантаження даних.
 * Не прив'язаний до конкретного API — приймає функцію запиту.
 *
 * ВАЖЛИВО: fetchFn має бути стабільною (useMemo / useCallback),
 * інакше дані перезавантажуватимуться на кожному рендері.
 *
 * Стан змінюється лише після завершення запиту. loading обчислюється:
 * поки результат не належить поточному запиту, вважаємо, що йде завантаження.
 * Застарілі відповіді ігноруються (прапорець cancelled у cleanup).
 * Під час повторного завантаження попередні дані не стираються.
 *
 * @param {Function} fetchFn - асинхронна функція, що повертає дані
 * @returns {{ data: *, loading: boolean, error: string|null, reload: Function }}
 */
export function useFetch(fetchFn) {
  const [reloadCount, setReloadCount] = useState(0);

  // результат пам'ятає, для якого запиту він отриманий
  const [result, setResult] = useState({
    data: null,
    error: null,
    fetchFn: null,
    reloadCount: -1,
  });

  useEffect(() => {
    let cancelled = false;

    fetchFn()
      .then((data) => {
        if (cancelled) return; // застаріла відповідь
        setResult({ data, error: null, fetchFn, reloadCount });
      })
      .catch((err) => {
        if (cancelled) return;
        setResult((prev) => ({
          data: prev.data,
          error: err.message || "Сталася помилка при завантаженні",
          fetchFn,
          reloadCount,
        }));
      });

    // при розмонтуванні або зміні запиту поточна відповідь стає неактуальною
    return () => {
      cancelled = true;
    };
  }, [fetchFn, reloadCount]);

  const loading =
    result.fetchFn !== fetchFn || result.reloadCount !== reloadCount;

  const reload = useCallback(() => {
    setReloadCount((count) => count + 1);
  }, []);

  return {
    data: result.data,
    loading,
    error: loading ? null : result.error,
    reload,
  };
}