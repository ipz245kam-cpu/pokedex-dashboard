import { useDispatch, useSelector } from "react-redux";
import {
  selectSearch,
  selectTypeFilter,
  selectSortField,
  selectSortDir,
  setSearch,
  setTypeFilter,
  setSortField,
  toggleSortDir,
  resetFilters,
} from "../store/filtersSlice";

/**
 * Доступ до фільтрів через Redux store.
 * Інтерфейс збережено — компоненти не потребують змін.
 * @returns {{ search, typeFilter, sortField, sortDir, setSearch, ... }}
 */
export function useFilters() {
  const dispatch = useDispatch();
  const search = useSelector(selectSearch);
  const typeFilter = useSelector(selectTypeFilter);
  const sortField = useSelector(selectSortField);
  const sortDir = useSelector(selectSortDir);

  return {
    search,
    typeFilter,
    sortField,
    sortDir,
    setSearch: (val) => dispatch(setSearch(val)),
    setTypeFilter: (val) => dispatch(setTypeFilter(val)),
    setSortField: (val) => dispatch(setSortField(val)),
    toggleSortDir: () => dispatch(toggleSortDir()),
    resetFilters: () => dispatch(resetFilters()),
  };
}