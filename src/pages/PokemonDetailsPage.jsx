import { Link, useParams } from "react-router";
import { usePokemonDetails } from "../hooks/usePokemonDetails";
import { StatusView } from "../components/StatusView";

const STAT_LABELS = {
  hp: "HP",
  attack: "Атака",
  defense: "Захист",
  "special-attack": "Спец. атака",
  "special-defense": "Спец. захист",
  speed: "Швидкість",
};

export function PokemonDetailsPage() {
  // id береться з параметра маршруту /pokemon/:id
  const { id } = useParams();
  const { data, loading, error, reload } = usePokemonDetails(id);

  let content;

  if (loading) {
    content = <StatusView status="loading" />;
  } else if (error) {
    content = <StatusView status="error" error={error} onRetry={reload} />;
  } else if (!data) {
    content = (
      <div className="status">
        <p>Покемона «{id}» не знайдено.</p>
      </div>
    );
  } else {
    content = (
      <div className="details">
        {data.image && (
          <img className="details__image" src={data.image} alt={data.name} />
        )}

        <h1 className="details__name">
          #{data.id} {data.name}
        </h1>

        <p className="details__types">Типи: {data.types.join(", ")}</p>

        <ul className="details__info">
          <li>Зріст: {data.height / 10} м</li>
          <li>Вага: {data.weight / 10} кг</li>
          <li>Базовий досвід: {data.baseExperience}</li>
          <li>Здібності: {data.abilities.join(", ")}</li>
        </ul>

        <h2>Характеристики</h2>
        <table className="pokemon-table details__stats">
          <tbody>
            {data.stats.map((s) => (
              <tr key={s.name}>
                <td>{STAT_LABELS[s.name] ?? s.name}</td>
                <td>{s.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="details-page">
      <Link to="/" className="back-link">
        ← Назад до списку
      </Link>
      {content}
    </div>
  );
}