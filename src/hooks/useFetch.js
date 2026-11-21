import { useState, useEffect, useCallback } from "react";

/**
 * Загальний хук для завантаження даних.
 * Не прив'язаний до конкретного API — приймає функцію запиту.
 *
 * fetchFn отримує AbortSignal першим аргументом: fetchFn(signal).
 * Коли запит стає неактуальним (зміна fetchFn, reload, розмонтування),
 * він скасовується через AbortController.
 *
 * ВАЖЛИВО: fetchFn має бути стабільною (useMemo / useCallback),
 * інакше дані перезавантажуватимуться на кожному рендері.
 *
 * Стан змінюється лише після завершення запиту. loading обчислюється:
 * поки результат не належить поточному запиту, вважаємо, що йде завантаження.
 * Під час повторного завантаження попередні дані не стираються.
 *
 * @param {(signal: AbortSignal) => Promise<*>} fetchFn
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
    const controller = new AbortController();

    fetchFn(controller.signal)
      .then((data) => {
        if (controller.signal.aborted) return; // запит скасовано
        setResult({ data, error: null, fetchFn, reloadCount });
      })
      .catch((err) => {
        // скасування - це не помилка
        if (err.name === "AbortError" || controller.signal.aborted) return;
        setResult((prev) => ({
          data: prev.data,
          error: err.message || "Сталася помилка при завантаженні",
          fetchFn,
          reloadCount,
        }));
      });

    // при розмонтуванні або зміні запиту скасовуємо поточний запит
    return () => controller.abort();
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