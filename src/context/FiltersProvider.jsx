import { useState, useMemo, useCallback } from "react";
import { FiltersContext } from "./FiltersContext";
import { DEFAULT_FILTERS } from "../config/defaults";

export function FiltersProvider({ children }) {
  // ініціалізуємо стан з єдиного джерела правди
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const setSearch = useCallback(
    (search) => setFilters((prev) => ({ ...prev, search })),
    []
  );

  const setTypeFilter = useCallback(
    (typeFilter) => setFilters((prev) => ({ ...prev, typeFilter })),
    []
  );

  const setSortField = useCallback(
    (sortField) => setFilters((prev) => ({ ...prev, sortField })),
    []
  );

  const toggleSortDir = useCallback(
    () =>
      setFilters((prev) => ({
        ...prev,
        sortDir: prev.sortDir === "asc" ? "desc" : "asc",
      })),
    []
  );

  // скидання повертає до DEFAULT_FILTERS, а не прописує значення вручну
  const resetFilters = useCallback(() => setFilters(DEFAULT_FILTERS), []);

  const value = useMemo(
    () => ({
      ...filters,
      setSearch,
      setTypeFilter,
      setSortField,
      toggleSortDir,
      resetFilters,
    }),
    [filters, setSearch, setTypeFilter, setSortField, toggleSortDir, resetFilters]
  );

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
}