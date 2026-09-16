export function TypeFilter({ types, value, onChange }) {
  return (
    <div className="type-filter">
      <label>
        Фільтр за типом:{" "}
        <select value={value} onChange={(e) => onChange(e.target.value)}>
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