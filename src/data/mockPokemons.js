// src/data/mockPokemons.js
// Mock-дані, що імітують структуру відповіді PokeAPI.
// У майбутніх лабораторних цей масив буде замінено на реальні дані з pokeapi.co

export const mockPokemons = [
  {
    id: 1,
    name: "Bulbasaur",
    types: ["grass", "poison"],
    stats: { hp: 45, attack: 49, defense: 49, spAttack: 65, spDefense: 65, speed: 45 },
    abilities: ["Overgrow", "Chlorophyll"],
  },
  {
    id: 4,
    name: "Charmander",
    types: ["fire"],
    stats: { hp: 39, attack: 52, defense: 43, spAttack: 60, spDefense: 50, speed: 65 },
    abilities: ["Blaze", "Solar Power"],
  },
  {
    id: 7,
    name: "Squirtle",
    types: ["water"],
    stats: { hp: 44, attack: 48, defense: 65, spAttack: 50, spDefense: 64, speed: 43 },
    abilities: ["Torrent", "Rain Dish"],
  },
  {
    id: 25,
    name: "Pikachu",
    types: ["electric"],
    stats: { hp: 35, attack: 55, defense: 40, spAttack: 50, spDefense: 50, speed: 90 },
    abilities: ["Static", "Lightning Rod"],
  },
  {
    id: 39,
    name: "Jigglypuff",
    types: ["normal", "fairy"],
    stats: { hp: 115, attack: 45, defense: 20, spAttack: 45, spDefense: 25, speed: 20 },
    abilities: ["Cute Charm", "Competitive"],
  },
  {
    id: 52,
    name: "Meowth",
    types: ["normal"],
    stats: { hp: 40, attack: 45, defense: 35, spAttack: 40, spDefense: 40, speed: 90 },
    abilities: ["Pickup", "Technician"],
  },
  {
    id: 66,
    name: "Machop",
    types: ["fighting"],
    stats: { hp: 70, attack: 80, defense: 50, spAttack: 35, spDefense: 35, speed: 35 },
    abilities: ["Guts", "No Guard"],
  },
  {
    id: 92,
    name: "Gastly",
    types: ["ghost", "poison"],
    stats: { hp: 30, attack: 35, defense: 30, spAttack: 100, spDefense: 35, speed: 80 },
    abilities: ["Levitate"],
  },
  {
    id: 129,
    name: "Magikarp",
    types: ["water"],
    stats: { hp: 20, attack: 10, defense: 55, spAttack: 15, spDefense: 20, speed: 80 },
    abilities: ["Swift Swim", "Rattled"],
  },
  {
    id: 133,
    name: "Eevee",
    types: ["normal"],
    stats: { hp: 55, attack: 55, defense: 50, spAttack: 45, spDefense: 65, speed: 55 },
    abilities: ["Run Away", "Adaptability"],
  },
];

// Список усіх унікальних типів — знадобиться для випадаючого списку фільтра
export const allTypes = [
  ...new Set(mockPokemons.flatMap((p) => p.types)),
];