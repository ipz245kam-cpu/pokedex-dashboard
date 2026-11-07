import { useFilters } from "../hooks/useFilters";

export function TypeFilter({ types }) {
  const { typeFilter, setTypeFilter } = useFilters();

  return (
    <div className="type-filter">
      <label>
        Фільтр за типом:{" "}
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="all">Усі типи</option>
          {types.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}