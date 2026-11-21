import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFilters } from "../hooks/useFilters";
import { useDebounce } from "../hooks/useDebounce";
import { usePokemonList } from "../hooks/usePokemonList";
import { StatusView } from "../components/StatusView";
import { PokemonTable } from "../components/PokemonTable";
import { SortControls } from "../components/SortControls";
import { TypeFilter } from "../components/TypeFilter";
import { KpiSection } from "../components/KpiSection";
import { DEBOUNCE_DELAY, DEFAULT_FILTERS } from "../config/defaults";

export function DashboardPage() {
  const { sortDir, resetFilters } = useFilters();

  const {
    register,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: DEFAULT_FILTERS });

  // форма — єдине джерело правди для search, typeFilter, sortField
  // eslint-disable-next-line react-hooks/incompatible-library
  const { search, typeFilter, sortField } = watch();

  // при першому рендері встановлюємо дефолтні значення у форму
  useEffect(() => {
    reset(DEFAULT_FILTERS);
  }, [reset]);

  // скидаємо і форму, і Context одночасно
  const handleReset = () => {
    reset(DEFAULT_FILTERS);
    resetFilters();
  };

  const debouncedSearch = useDebounce(search ?? "", DEBOUNCE_DELAY);

  const { pokemons, allTypes, hasData, loading, error, reload } =
    usePokemonList({
      search: debouncedSearch,
      typeFilter: typeFilter ?? DEFAULT_FILTERS.typeFilter,
      sortField: sortField ?? DEFAULT_FILTERS.sortField,
      sortDir,
    });

  const status = error ? "error" : loading && !hasData ? "loading" : "success";

  return (
    <div className="dashboard-page">
      <h1>Покедекс — дашборд</h1>

      <form className="filter-panel" onSubmit={(e) => e.preventDefault()}>
        <div className="filter-field">
          <input
            type="text"
            placeholder="Пошук за іменем (англ.)..."
            aria-label="Пошук покемона"
            aria-invalid={!!errors.search}
            {...register("search", {
              maxLength: {
                value: 50,
                message: "Не більше 50 символів",
              },
              pattern: {
                value: /^[a-zA-Z\s-]*$/,
                message: "Лише латинські літери, пробіл або дефіс",
              },
            })}
          />
          {errors.search && (
            <span className="filter-error">{errors.search.message}</span>
          )}
        </div>

        <TypeFilter types={allTypes} control={control} />

        <SortControls control={control} errors={errors} />

        <button type="button" onClick={handleReset}>
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