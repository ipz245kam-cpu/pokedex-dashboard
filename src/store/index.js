import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "./filtersSlice";
import themeReducer from "./themeSlice";
import favoritesReducer from "./favoritesSlice";
import chartReducer from "./chartSlice";

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    theme: themeReducer,
    favorites: favoritesReducer,
    chart: chartReducer,
  },
});

// типи для майбутнього використання
export const getState = store.getState;
export const dispatch = store.dispatch;