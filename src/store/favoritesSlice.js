import { createSlice, createSelector } from "@reduxjs/toolkit";

const STORAGE_KEY = "pokedex-favorites";

function getInitialFavorites() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // ігноруємо
  }
  return [];
}

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: { ids: getInitialFavorites() },
  reducers: {
    toggleFavorite(state, action) {
      const id = action.payload;
      const index = state.ids.indexOf(id);
      if (index === -1) {
        state.ids.push(id);
      } else {
        state.ids.splice(index, 1);
      }
      // зберігаємо в localStorage після кожної зміни
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.ids));
      } catch {
        // ігноруємо
      }
    },
    clearFavorites(state) {
      state.ids = [];
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ігноруємо
      }
    },
  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;

// селектори
export const selectFavoriteIds = createSelector(
  (state) => state.favorites,
  (favorites) => favorites.ids
);

export const selectFavoritesCount = createSelector(
  selectFavoriteIds,
  (ids) => ids.length
);

// чи є покемон в обраних
export const selectIsFavorite = (id) =>
  createSelector(selectFavoriteIds, (ids) => ids.includes(id));

export default favoritesSlice.reducer;