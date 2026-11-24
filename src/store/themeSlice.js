import { createSlice, createSelector } from "@reduxjs/toolkit";

const STORAGE_KEY = "pokedex-theme";

function getInitialTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    // localStorage може бути недоступний
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

const themeSlice = createSlice({
  name: "theme",
  initialState: { value: getInitialTheme() },
  reducers: {
    toggleTheme(state) {
      state.value = state.value === "light" ? "dark" : "light";
    },
    setTheme(state, action) {
      state.value = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

// селектор
export const selectTheme = createSelector(
  (state) => state.theme,
  (theme) => theme.value
);

export default themeSlice.reducer;