import { useCallback } from "react";
import { useFetch } from "./useFetch";
import { fetchPokemonById } from "../api/pokeapi";

/**
 * Хук завантаження деталей одного покемона за id з параметра маршруту.
 * Обгортка над загальним useFetch.
 * Якщо покемона не існує, data === null (і error === null).
 *
 * @param {string} id - id або ім'я покемона
 * @returns {{ data, loading, error, reload }}
 */
export function usePokemonDetails(id) {
  const fetchFn = useCallback(() => fetchPokemonById(id), [id]);

  return useFetch(fetchFn);
}