export function KpiSection({ pokemons }) {
  const total = pokemons.length;

  const byType = pokemons.reduce((acc, p) => {
    p.types.forEach((type) => {
      acc[type] = (acc[type] || 0) + 1;
    });
    return acc;
  }, {});

  const typeEntries = Object.entries(byType).sort((a, b) => b[1] - a[1]);

  return (
    <div className="kpi-section">
      <div className="kpi-card">
        <span className="kpi-value">{total}</span>
        <span className="kpi-label">Усього покемонів</span>
      </div>
      {typeEntries.map(([type, count]) => (
        <div className="kpi-card" key={type}>
          <span className="kpi-value">{count}</span>
          <span className="kpi-label">Тип: {type}</span>
        </div>
      ))}
    </div>
  );
}