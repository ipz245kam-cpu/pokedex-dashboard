import { useState, useMemo } from "react";
import { usePokemonList } from "../hooks/usePokemonList";
import { StatusView } from "./StatusView";
import { PokemonTable } from "./PokemonTable";
import { SortControls } from "./SortControls";
import { TypeFilter } from "./TypeFilter";
import { KpiSection } from "./KpiSection";

export function DashboardPage() {
  const { data, status, error, reload } = usePokemonList(151);

  const [sortField, setSortField] = useState("name");
  const [sortDir, setSortDir] = useState("asc");
  const [typeFilter, setTypeFilter] = useState("all");

  const allTypes = useMemo(() => {
    const set = new Set();
    data.forEach((p) => p.types.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [data]);

  const sortedData = useMemo(() => {
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

  return (
    <div className="dashboard-page">
      <h1>Покедекс — дашборд</h1>

      {status !== "success" && (
        <StatusView status={status} error={error} onRetry={reload} />
      )}

      {status === "success" && (
        <>
          <KpiSection pokemons={data} />
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
          <PokemonTable pokemons={sortedData} />
        </>
      )}
    </div>
  );
}