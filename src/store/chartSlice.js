import { createSlice, createSelector } from "@reduxjs/toolkit";

const CHART_TYPES = ["bar", "line"];

const chartSlice = createSlice({
  name: "chart",
  initialState: { type: "bar" },
  reducers: {
    setChartType(state, action) {
      if (CHART_TYPES.includes(action.payload)) {
        state.type = action.payload;
      }
    },
  },
});

export const { setChartType } = chartSlice.actions;

export { CHART_TYPES };

// селектор
export const selectChartType = createSelector(
  (state) => state.chart,
  (chart) => chart.type
);

export default chartSlice.reducer;