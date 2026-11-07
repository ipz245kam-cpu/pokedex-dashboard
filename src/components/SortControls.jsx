import { useFilters } from "../hooks/useFilters";

const FIELDS = [
  { value: "name", label: "Назва" },
  { value: "attack", label: "Атака" },
  { value: "hp", label: "HP" },
];

export function SortControls() {
  const { sortField, setSortField, sortDir, toggleSortDir } = useFilters();

  return (
    <div className="sort-controls">
      <label>
        Сортувати за:{" "}
        <select value={sortField} onChange={(e) => setSortField(e.target.value)}>
          {FIELDS.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
      </label>
      <button type="button" onClick={toggleSortDir}>
        {sortDir === "asc" ? "За зростанням ↑" : "За спаданням ↓"}
      </button>
    </div>
  );
}