import { useMemo } from "react";
import { usePokemonList } from "../hooks/usePokemonList";
import { useDebounce } from "../hooks/useDebounce";
import { useFilters } from "../hooks/useFilters";
import { StatusView } from "../components/StatusView";
import { PokemonTable } from "../components/PokemonTable";
import { SortControls } from "../components/SortControls";
import { TypeFilter } from "../components/TypeFilter";
import { KpiSection } from "../components/KpiSection";

export function DashboardPage() {
  // активні фільтри беремо з Context
  const { search, setSearch, typeFilter, sortField, sortDir, resetFilters } =
    useFilters();

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

  return (
    <div className="dashboard-page">
      <h1>Покедекс — дашборд</h1>

      <form className="filter-panel" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Пошук за іменем (англ.)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TypeFilter types={allTypes} />

        <SortControls />

        <button type="button" onClick={resetFilters}>
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