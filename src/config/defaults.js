// Скільки покемонів завантажувати зі списку
export const POKEMON_LIMIT = 151;

// Затримка debounce для поля пошуку (мс)
export const DEBOUNCE_DELAY = 400;

// Значення фільтрів за замовчуванням — єдине джерело правди.
// FiltersProvider ініціалізує стан з цього об'єкта,
// а скидання повертає до нього ж (не прописує значення вдруге).
export const DEFAULT_FILTERS = {
  search: "",
  typeFilter: "all",
  sortField: "name",
  sortDir: "asc",
};