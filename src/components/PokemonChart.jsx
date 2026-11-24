import { useDispatch, useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { selectChartType, setChartType, CHART_TYPES } from "../store/chartSlice";

function buildChartData(pokemons) {
  const counts = {};
  pokemons.forEach((p) => {
    p.types.forEach((t) => {
      counts[t] = (counts[t] ?? 0) + 1;
    });
  });
  return Object.entries(counts)
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count);
}

export function PokemonChart({ pokemons }) {
  const dispatch = useDispatch();
  const chartType = useSelector(selectChartType);
  const data = buildChartData(pokemons);

  if (data.length === 0) return null;

  return (
    <div className="pokemon-chart">
      <div className="pokemon-chart__header">
        <h2>Розподіл за типом</h2>
        <div className="pokemon-chart__switcher">
          {CHART_TYPES.map((t) => (
            <button
              key={t}
              type="button"
              className={"chart-type-btn" + (chartType === t ? " chart-type-btn--active" : "")}
              onClick={() => dispatch(setChartType(t))}
            >
              {t === "bar" ? "Стовпчиковий" : "Лінійний"}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        {chartType === "bar" ? (
          <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="type"
              angle={-45}
              textAnchor="end"
              interval={0}
              tick={{ fontSize: 12 }}
            />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="var(--accent)" radius={[4, 4, 0, 0]} />
          </BarChart>
        ) : (
          <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="type"
              angle={-45}
              textAnchor="end"
              interval={0}
              tick={{ fontSize: 12 }}
            />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="var(--accent)"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}