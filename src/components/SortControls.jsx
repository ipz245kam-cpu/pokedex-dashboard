import { Controller } from "react-hook-form";
import { useFilters } from "../hooks/useFilters";

const FIELDS = [
  { value: "name", label: "Назва" },
  { value: "attack", label: "Атака" },
  { value: "hp", label: "HP" },
  { value: "defense", label: "Захист" },
  { value: "speed", label: "Швидкість" },
];

/**
 * Поля сортування. Отримує control і errors з форми через props,
 * а напрямок сортування читає і перемикає через FiltersContext
 * (він не є полем форми, бо керується кнопкою, а не select/input).
 */
export function SortControls({ control, errors }) {
  const { sortDir, toggleSortDir } = useFilters();

  return (
    <div className="sort-controls">
      <label>
        Сортувати за:{" "}
        <Controller
          name="sortField"
          control={control}
          rules={{
            validate: (val) =>
              FIELDS.some((f) => f.value === val) ||
              "Недозволене поле сортування",
          }}
          render={({ field }) => (
            <select {...field}>
              {FIELDS.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
          )}
        />
      </label>
      {errors?.sortField && (
        <span className="filter-error">{errors.sortField.message}</span>
      )}
      <button type="button" onClick={toggleSortDir}>
        {sortDir === "asc" ? "За зростанням ↑" : "За спаданням ↓"}
      </button>
    </div>
  );
}