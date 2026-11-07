import { useState, useMemo, useCallback } from "react";
import { FiltersContext } from "./FiltersContext";

export function FiltersProvider({ children }) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortField, setSortField] = useState("name");
  const [sortDir, setSortDir] = useState("asc");

  const toggleSortDir = useCallback(() => {
    setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
  }, []);

  // скидання всіх фільтрів до початкового стану
  const resetFilters = useCallback(() => {
    setSearch("");
    setTypeFilter("all");
    setSortField("name");
    setSortDir("asc");
  }, []);

  const value = useMemo(
    () => ({
      search,
      setSearch,
      typeFilter,
      setTypeFilter,
      sortField,
      setSortField,
      sortDir,
      toggleSortDir,
      resetFilters,
    }),
    [search, typeFilter, sortField, sortDir, toggleSortDir, resetFilters]
  );

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
}