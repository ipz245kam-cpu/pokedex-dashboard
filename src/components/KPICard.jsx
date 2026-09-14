// src/components/KPICard.jsx

function KPICard({ title, value, change }) {
  const isPositive = typeof change === "number" && change >= 0;

  return (
    <div className="kpi-card">
      <p className="kpi-card__title">{title}</p>
      <p className="kpi-card__value">{value}</p>
      {change !== undefined && (
        <p
          className={
            "kpi-card__change " +
            (isPositive ? "kpi-card__change--up" : "kpi-card__change--down")
          }
        >
          {isPositive ? "▲" : "▼"} {Math.abs(change)}%
        </p>
      )}
    </div>
  );
}

export default KPICard;