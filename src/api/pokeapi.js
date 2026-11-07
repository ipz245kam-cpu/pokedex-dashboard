const BASE_URL = "https://pokeapi.co/api/v2";

// Дістає деталі одного покемона за URL зі списку
async function fetchPokemonDetails(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Не вдалося завантажити покемона: ${res.status}`);
  }
  const data = await res.json();

  return {
    id: data.id,
    name: data.name,
    sprite: data.sprites?.front_default ?? null,
    types: data.types.map((t) => t.type.name),
    hp: data.stats.find((s) => s.stat.name === "hp")?.base_stat ?? 0,
    attack: data.stats.find((s) => s.stat.name === "attack")?.base_stat ?? 0,
    defense: data.stats.find((s) => s.stat.name === "defense")?.base_stat ?? 0,
    speed: data.stats.find((s) => s.stat.name === "speed")?.base_stat ?? 0,
    abilities: data.abilities.map((a) => a.ability.name),
  };
}

// Основна функція: тягне список і деталі кожного покемона
export async function fetchPokemonList(limit = 151) {
  const listRes = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=0`);
  if (!listRes.ok) {
    throw new Error(`Не вдалося завантажити список: ${listRes.status}`);
  }
  const listData = await listRes.json();

  const details = await Promise.all(
    listData.results.map((p) => fetchPokemonDetails(p.url))
  );

  return details;
}

// Розширена інформація про одного покемона (для сторінки деталей).
// Якщо покемона з таким id не існує - повертає null.
export async function fetchPokemonById(id) {
  const res = await fetch(`${BASE_URL}/pokemon/${encodeURIComponent(id)}`);

  if (res.status === 404) {
    return null;
  }
  if (!res.ok) {
    throw new Error(`Не вдалося завантажити покемона: ${res.status}`);
  }

  const data = await res.json();

  return {
    id: data.id,
    name: data.name,
    image:
      data.sprites?.other?.["official-artwork"]?.front_default ??
      data.sprites?.front_default ??
      null,
    types: data.types.map((t) => t.type.name),
    height: data.height, // дециметри
    weight: data.weight, // гектограми
    baseExperience: data.base_experience ?? 0,
    stats: data.stats.map((s) => ({
      name: s.stat.name,
      value: s.base_stat,
    })),
    abilities: data.abilities.map((a) => a.ability.name),
  };
}