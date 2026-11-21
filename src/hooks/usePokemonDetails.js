import { useCallback } from "react";
import { useFetch } from "./useFetch";
import { fetchPokemonById } from "../api/pokeapi";

/**
 * Хук завантаження деталей одного покемона за id з параметра маршруту.
 * Якщо покемона не існує, data === null (і error === null).
 *
 * @param {string} id - id або ім'я покемона
 */
export function usePokemonDetails(id) {
  const fetchFn = useCallback(
    (signal) => fetchPokemonById(id, signal),
    [id]
  );

  return useFetch(fetchFn);
}