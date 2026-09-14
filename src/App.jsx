// src/App.jsx
import KPICard from "./components/KPICard";
import Counter from "./components/Counter";
import Toggle from "./components/Toggle";
import FilteredList from "./components/FilteredList";
import { mockPokemons, allTypes } from "./data/mockPokemons";
import "./App.css";

function App() {
  const totalPokemons = mockPokemons.length;

  const typeCounts = {};
  mockPokemons.forEach((p) => {
    p.types.forEach((t) => {
      typeCounts[t] = (typeCounts[t] || 0) + 1;
    });
  });
  const [topType, topTypeCount] = Object.entries(typeCounts).sort(
    (a, b) => b[1] - a[1]
  )[0];

  const avgAttack = Math.round(
    mockPokemons.reduce((sum, p) => sum + p.stats.attack, 0) / totalPokemons
  );

  return (
    <div className="app">
      <header className="app__header">
        <h1>Покедекс Dashboard</h1>
        <p>Варіант А · Simple dashboard widgets</p>
      </header>

      <section className="app__kpis">
        <KPICard title="Усього покемонів" value={totalPokemons} />
        <KPICard
          title="Найпопулярніший тип"
          value={`${topType} (${topTypeCount})`}
        />
        <KPICard title="Середній Attack" value={avgAttack} change={4.2} />
      </section>

      <section className="app__widgets">
        <Counter label="Caught Pokémon" />
        <Toggle />
      </section>

      <section className="app__list">
        <FilteredList pokemons={mockPokemons} types={allTypes} />
      </section>
    </div>
  );
}

export default App;