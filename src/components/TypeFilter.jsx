import { Controller } from "react-hook-form";

/**
 * Фільтр за типом покемона.
 * Отримує control і список types через props.
 * Не залежить від FiltersContext — значення керується формою.
 */
export function TypeFilter({ types, control }) {
  return (
    <div className="type-filter">
      <label>
        Фільтр за типом:{" "}
        <Controller
          name="typeFilter"
          control={control}
          render={({ field }) => (
            <select {...field}>
              <option value="all">Усі типи</option>
              {types.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          )}
        />
      </label>
    </div>
  );
}