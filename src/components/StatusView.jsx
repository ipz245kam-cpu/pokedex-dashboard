export function StatusView({ status, error, onRetry }) {
  if (status === "loading") {
    return <p className="status status-loading">Завантаження покемонів…</p>;
  }

  if (status === "error") {
    return (
      <div className="status status-error">
        <p>Помилка: {error}</p>
        <button onClick={onRetry}>Спробувати ще раз</button>
      </div>
    );
  }

  return null;
}