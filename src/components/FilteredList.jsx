// src/components/FilteredList.jsx
import { useState } from "react";

function FilteredList({ pokemons, types }) {
  const [selectedType, setSelectedType] = useState("all");

  const filteredPokemons =
    selectedType === "all"
      ? pokemons
      : pokemons.filter((p) => p.types.includes(selectedType));

  return (
    <div className="filtered-list">
      <div className="filtered-list__header">
        <p className="filtered-list__title">Покемони</p>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="all">Усі типи</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <ul className="filtered-list__items">
        {filteredPokemons.map((p) => (
          <li key={p.id} className="filtered-list__item">
            <span className="filtered-list__name">{p.name}</span>
            <span className="filtered-list__types">
              {p.types.join(", ")}
            </span>
          </li>
        ))}
      </ul>

      {filteredPokemons.length === 0 && (
        <p className="filtered-list__empty">Нічого не знайдено</p>
      )}
    </div>
  );
}

export default FilteredList;