const FIELDS = [
  { value: "name", label: "Назва" },
  { value: "attack", label: "Атака" },
  { value: "hp", label: "HP" },
];

export function SortControls({ sortField, sortDir, onFieldChange, onDirToggle }) {
  return (
    <div className="sort-controls">
      <label>
        Сортувати за:{" "}
        <select value={sortField} onChange={(e) => onFieldChange(e.target.value)}>
          {FIELDS.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
      </label>
      <button onClick={onDirToggle}>
        {sortDir === "asc" ? "За зростанням ↑" : "За спаданням ↓"}
      </button>
    </div>
  );
}