import { useCallback } from "react";
import { useFetch } from "./useFetch";
import { fetchPokemonList } from "../api/pokeapi";

export function usePokemonList({ limit = 151 } = {}) {
  const fetchFn = useCallback(
    (signal) => fetchPokemonList(limit, signal),
    [limit]
  );

  return useFetch(fetchFn);
}