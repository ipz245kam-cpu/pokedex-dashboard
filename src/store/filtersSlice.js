import { createSlice, createSelector } from "@reduxjs/toolkit";
import { DEFAULT_FILTERS } from "../config/defaults";

const filtersSlice = createSlice({
  name: "filters",
  initialState: DEFAULT_FILTERS,
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
    setTypeFilter(state, action) {
      state.typeFilter = action.payload;
    },
    setSortField(state, action) {
      state.sortField = action.payload;
    },
    toggleSortDir(state) {
      state.sortDir = state.sortDir === "asc" ? "desc" : "asc";
    },
    resetFilters() {
      return DEFAULT_FILTERS;
    },
  },
});

export const {
  setSearch,
  setTypeFilter,
  setSortField,
  toggleSortDir,
  resetFilters,
} = filtersSlice.actions;

// селектори
const selectFiltersState = (state) => state.filters;

export const selectSearch = createSelector(
  selectFiltersState,
  (f) => f.search
);
export const selectTypeFilter = createSelector(
  selectFiltersState,
  (f) => f.typeFilter
);
export const selectSortField = createSelector(
  selectFiltersState,
  (f) => f.sortField
);
export const selectSortDir = createSelector(
  selectFiltersState,
  (f) => f.sortDir
);
export const selectAllFilters = createSelector(
  selectFiltersState,
  (f) => f
);

export default filtersSlice.reducer;