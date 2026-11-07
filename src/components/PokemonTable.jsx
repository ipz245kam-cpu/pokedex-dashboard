import { Link, useNavigate } from "react-router";

export function PokemonTable({ pokemons }) {
  const navigate = useNavigate();

  if (pokemons.length === 0) {
    return <p className="status status-empty">Дані відсутні</p>;
  }

  return (
    <table className="pokemon-table">
      <thead>
        <tr>
          <th></th>
          <th>Назва</th>
          <th>Типи</th>
          <th>HP</th>
          <th>Атака</th>
          <th>Захист</th>
        </tr>
      </thead>
      <tbody>
        {pokemons.map((p) => (
          <tr
            key={p.id}
            className="pokemon-row"
            onClick={() => navigate(`/pokemon/${p.id}`)}
          >
            <td>
              {p.sprite && <img src={p.sprite} alt={p.name} width={40} />}
            </td>
            <td>
              <Link
                to={`/pokemon/${p.id}`}
                onClick={(e) => e.stopPropagation()}
              >
                {p.name}
              </Link>
            </td>
            <td>{p.types.join(", ")}</td>
            <td>{p.hp}</td>
            <td>{p.attack}</td>
            <td>{p.defense}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}