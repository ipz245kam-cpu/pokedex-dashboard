import { useFilters } from "../hooks/useFilters";
import { useDebounce } from "../hooks/useDebounce";
import { usePokemonList } from "../hooks/usePokemonList";
import { StatusView } from "../components/StatusView";
import { PokemonTable } from "../components/PokemonTable";
import { SortControls } from "../components/SortControls";
import { TypeFilter } from "../components/TypeFilter";
import { KpiSection } from "../components/KpiSection";
import { DEBOUNCE_DELAY } from "../config/defaults";

export function DashboardPage() {
  const { search, setSearch, typeFilter, sortField, sortDir, resetFilters } =
    useFilters();

  const debouncedSearch = useDebounce(search, DEBOUNCE_DELAY);

  const { pokemons, allTypes, hasData, loading, error, reload } =
    usePokemonList({
      search: debouncedSearch,
      typeFilter,
      sortField,
      sortDir,
    });

  const status = error ? "error" : loading && !hasData ? "loading" : "success";

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

      {hasData && (
        <>
          <KpiSection pokemons={pokemons} />
          <PokemonTable pokemons={pokemons} />
        </>
      )}
    </div>
  );
}