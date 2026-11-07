import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <div className="not-found-page">
      <h1>404</h1>
      <p>Сторінку не знайдено.</p>
      <p>
        <Link to="/">← На головну</Link>
      </p>
    </div>
  );
}