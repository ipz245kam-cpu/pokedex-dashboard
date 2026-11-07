import { useContext } from "react";
import { FiltersContext } from "../context/FiltersContext";

/**
 * Доступ до активних фільтрів через Context (без prop drilling).
 */
export function useFilters() {
  const ctx = useContext(FiltersContext);
  if (!ctx) {
    throw new Error("useFilters має використовуватись всередині FiltersProvider");
  }
  return ctx;
}