export function PokemonTable({ pokemons }) {
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
          <tr key={p.id}>
            <td>
              {p.sprite && <img src={p.sprite} alt={p.name} width={40} />}
            </td>
            <td>{p.name}</td>
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