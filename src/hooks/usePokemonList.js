import { useCallback, useMemo } from "react";
import { useFetch } from "./useFetch";
import { fetchPokemonList } from "../api/pokeapi";
import { POKEMON_LIMIT, DEFAULT_FILTERS } from "../config/defaults";

/**
 * Хук списку покемонів: завантаження + фільтрація + сортування.
 * Список завантажується один раз (повторно лише при зміні limit),
 * а пошук, фільтр за типом і сортування виконуються на клієнті.
 *
 * @param {Object} params
 * @param {number} [params.limit]
 * @param {string} [params.search]
 * @param {string} [params.typeFilter]
 * @param {string} [params.sortField]
 * @param {string} [params.sortDir]
 * @returns {{ pokemons, allTypes, hasData, loading, error, reload }}
 */
export function usePokemonList({
  limit = POKEMON_LIMIT,
  search = DEFAULT_FILTERS.search,
  typeFilter = DEFAULT_FILTERS.typeFilter,
  sortField = DEFAULT_FILTERS.sortField,
  sortDir = DEFAULT_FILTERS.sortDir,
} = {}) {
  const fetchFn = useCallback(
    (signal) => fetchPokemonList(limit, signal),
    [limit]
  );

  const { data, loading, error, reload } = useFetch(fetchFn);

  // типи беремо з повного списку, тому вони не залежать від пошуку
  const allTypes = useMemo(() => {
    if (!data) return [];
    const set = new Set();
    data.forEach((p) => p.types.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [data]);

  // фільтрація за пошуком і типом, потім сортування (без мутації data)
  const pokemons = useMemo(() => {
    if (!data) return [];
    const query = search.trim().toLowerCase();

    const filtered = data.filter((p) => {
      const matchesSearch = !query || p.name.toLowerCase().includes(query);
      const matchesType =
        typeFilter === DEFAULT_FILTERS.typeFilter ||
        p.types.includes(typeFilter);
      return matchesSearch && matchesType;
    });

    filtered.sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      if (typeof valA === "string") {
        return valA.localeCompare(valB);
      }
      return valA - valB;
    });

    return sortDir === "asc" ? filtered : filtered.reverse();
  }, [data, search, typeFilter, sortField, sortDir]);

  return {
    pokemons,
    allTypes,
    hasData: data !== null,
    loading,
    error,
    reload,
  };
}