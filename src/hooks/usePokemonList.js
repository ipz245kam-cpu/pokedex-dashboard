import { useCallback } from "react";
import { useFetch } from "./useFetch";
import { fetchPokemonList } from "../api/pokeapi";

/**
 * Хук завантаження списку покемонів.
 * Обгортка над загальним useFetch: завантажує список один раз
 * (повторно лише при зміні limit). Фільтрація та пошук виконуються
 * на клієнті, у компоненті сторінки.
 *
 * @param {Object} params
 * @param {number} params.limit - скільки покемонів завантажити
 * @returns {{ data, loading, error, reload }}
 */
export function usePokemonList({ limit = 151 } = {}) {
  const fetchFn = useCallback(() => fetchPokemonList(limit), [limit]);

  return useFetch(fetchFn);
}