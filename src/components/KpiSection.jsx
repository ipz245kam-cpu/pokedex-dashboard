import { useSelector } from "react-redux";
import { selectFavoritesCount } from "../store/favoritesSlice";

function KpiCard({ title, value }) {
  return (
    <div className="kpi-card">
      <p className="kpi-value">{value}</p>
      <p className="kpi-label">{title}</p>
    </div>
  );
}

export function KpiSection({ pokemons }) {
  const favoritesCount = useSelector(selectFavoritesCount);

  // рахуємо кількість покемонів кожного типу
  const typeCounts = {};
  pokemons.forEach((p) => {
    p.types.forEach((t) => {
      typeCounts[t] = (typeCounts[t] ?? 0) + 1;
    });
  });

  return (
    <div className="kpi-section">
      <KpiCard title="Усього покемонів" value={pokemons.length} />
      <KpiCard title="Обраних ★" value={favoritesCount} />
      {Object.entries(typeCounts)
        .sort((a, b) => b[1] - a[1])
        .map(([type, count]) => (
          <KpiCard key={type} title={`Тип: ${type}`} value={count} />
        ))}
    </div>
  );
}