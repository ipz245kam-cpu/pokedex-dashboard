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
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortField, setSortField] = useState("name");
  const [sortDir, setSortDir] = useState("asc");

  // debounce тільки для пошуку (щоб не фільтрувати на кожну літеру)
  const debouncedSearch = useDebounce(search, 400);

  // список завантажується один раз; фільтрація - на клієнті
  const { data, loading, error, reload } = usePokemonList({ limit: 151 });

  // статус для StatusView: "loading" лише поки даних ще немає зовсім
  const status = error ? "error" : loading && !data ? "loading" : "success";

  // типи беремо з повного списку, тому вони не залежать від пошуку
  const allTypes = useMemo(() => {
    if (!data) return [];
    const set = new Set();
    data.forEach((p) => p.types.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [data]);

  // 1) фільтрація за пошуком і типом
  const filteredData = useMemo(() => {
    if (!data) return [];
    const query = debouncedSearch.trim().toLowerCase();

    return data.filter((p) => {
      const matchesSearch = !query || p.name.toLowerCase().includes(query);
      const matchesType = typeFilter === "all" || p.types.includes(typeFilter);
      return matchesSearch && matchesType;
    });
  }, [data, debouncedSearch, typeFilter]);

  // 2) сортування (derived state, без мутації оригінального масиву)
  const sortedData = useMemo(() => {
    const copy = [...filteredData];
    copy.sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      if (typeof valA === "string") {
        return valA.localeCompare(valB);
      }
      return valA - valB;
    });
    return sortDir === "asc" ? copy : copy.reverse();
  }, [filteredData, sortField, sortDir]);

  const handleDirToggle = () => {
    setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  // скидання всіх фільтрів до початкового стану
  const handleResetFilters = () => {
    setSearch("");
    setTypeFilter("all");
    setSortField("name");
    setSortDir("asc");
  };

  return (
    <div className="dashboard-page">
      <h1>Покедекс — дашборд</h1>

      <form
        className="filter-panel"
        onSubmit={(e) => e.preventDefault()}
      >
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
      </form>

      {status !== "success" && (
        <StatusView status={status} error={error} onRetry={reload} />
      )}

      {data && (
        <>
          <KpiSection pokemons={filteredData} />
          <PokemonTable pokemons={sortedData} />
        </>
      )}
    </div>
  );
}