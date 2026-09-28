import { useMemo } from 'react';
import { useFetch } from './useFetch';
import { fetchPokemonList } from '../api/pokeapi';

/**
 * Хук завантаження списку покемонів.
 * Обгортка над загальним useFetch: формує запит з урахуванням ліміту та пошуку.
 *
 * @param {Object} params
 * @param {number} params.limit - скільки покемонів завантажити
 * @param {string} params.search - рядок пошуку за іменем (debounced)
 * @returns {{ data, loading, error, reload }}
 */
export function usePokemonList({ limit = 151, search = '' } = {}) {
  const fetchFn = useMemo(() => {
    return async () => {
      const result = await fetchPokemonList(limit);
      if (!search) return result;
      return result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    };
  }, [limit, search]);

  return useFetch(fetchFn, [limit, search]);
}