import { useState, useEffect, useCallback } from "react";
import { fetchPokemonList } from "../api/pokeapi";

export function usePokemonList(limit = 151) {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("loading"); // 'loading' | 'success' | 'error'
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    setStatus("loading");
    setError(null);
    try {
      const result = await fetchPokemonList(limit);
      setData(result);
      setStatus("success");
    } catch (err) {
      setError(err.message || "Сталася помилка при завантаженні");
      setStatus("error");
    }
  }, [limit]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { data, status, error, reload: loadData };
}