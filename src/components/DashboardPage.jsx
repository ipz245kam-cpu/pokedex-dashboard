import { useState, useMemo } from "react";
import { usePokemonList } from "../hooks/usePokemonList";
import { useDebounce } from "../hooks/useDebounce";
import { StatusView } from "./StatusView";
import { PokemonTable } from "./PokemonTable";
import { SortControls } from "./SortControls";
import { TypeFilter } from "./TypeFilter";
import { KpiSection } from "./KpiSection";

export function DashboardPage() {
  // --- контрольовані поля форми фільтрів ---
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortDir, setSortDir] = useState("asc");
  const [typeFilter, setTypeFilter] = useState("all");

  // debounce тільки для пошуку (щоб не смикати запит на кожну літеру)
  const debouncedSearch = useDebounce(search, 400);

  const { data, loading, error, reload } = usePokemonList({
    limit: 151,
    search: debouncedSearch,
  });

  // похідний статус для сумісності зі StatusView
  const status = loading ? "loading" : error ? "error" : "success";

  const allTypes = useMemo(() => {
    if (!data) return [];
    const set = new Set();
    data.forEach((p) => p.types.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [data]);

  const sortedData = useMemo(() => {
    if (!data) return [];
    const filtered =
      typeFilter === "all"
        ? data
        : data.filter((p) => p.types.includes(typeFilter));

    const copy = [...filtered]; // не мутуємо оригінальний масив
    copy.sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      if (typeof valA === "string") {
        return valA.localeCompare(valB);
      }
      return valA - valB;
    });
    return sortDir === "asc" ? copy : copy.reverse();
  }, [data, sortField, sortDir, typeFilter]);

  const handleDirToggle = () => {
    setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  // скидання всіх фільтрів до початкового стану
  const handleResetFilters = () => {
    setSearch("");
    setSortField("name");
    setSortDir("asc");
    setTypeFilter("all");
  };

  return (
    <div className="dashboard-page">
      <h1>Покедекс — дашборд</h1>

      <div className="filter-panel">
        <input
          type="text"
          placeholder="Пошук за іменем (англ.)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TypeFilter
          types={allTypes}
          value={typeFilter}
          onChange={setTypeFilter}
        />

        <SortControls
          sortField={sortField}
          sortDir={sortDir}
          onFieldChange={setSortField}
          onDirToggle={handleDirToggle}
        />

        <button type="button" onClick={handleResetFilters}>
          Скинути фільтри
        </button>
      </div>

      {status !== "success" && (
        <StatusView status={status} error={error} onRetry={reload} />
      )}

      {status === "success" && (
        <>
          <KpiSection pokemons={data} />
          <PokemonTable pokemons={sortedData} />
        </>
      )}
    </div>
  );
}