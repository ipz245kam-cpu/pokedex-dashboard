# Pokédex Dashboard

Навчальний React-дашборд на тему Покедекс (варіант А). Дані беруться з [PokeAPI](https://pokeapi.co).

## Стек

- React + Vite
- PokeAPI (REST)
- ESLint

## Запуск

```bash
npm install
npm run dev
```

Після запуску відкрий адресу з консолі (зазвичай `http://localhost:5173`).

## Структура проєкту

```
src/
├── api/
│   └── pokeapi.js          # запити до PokeAPI
├── components/
│   ├── DashboardPage.jsx   # контейнерний компонент сторінки
│   ├── KpiSection.jsx      # KPI-картки
│   ├── PokemonTable.jsx    # таблиця покемонів
│   ├── SortControls.jsx    # вибір поля та напрямку сортування
│   ├── StatusView.jsx      # стани loading / error
│   └── TypeFilter.jsx      # фільтр за типом
├── hooks/
│   ├── useDebounce.js      # debounce значення
│   ├── useFetch.js         # загальний хук завантаження даних
│   └── usePokemonList.js   # завантаження списку покемонів
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

## Лабораторні роботи

Стан проєкту після кожної лабораторної позначено git-тегом.

| ЛР | Тег | Що реалізовано |
|----|-----|----------------|
| ЛР1 | `lab1` | Прості віджети на mock-даних: KPI Card, Counter, Toggle, Filtered List |
| ЛР2 | `lab2` | Реальні дані з PokeAPI, стани loading / error / empty, таблиця, сортування, живі KPI, фільтр за типом |
| ЛР3 | `lab3` | Форма фільтрів (пошук, тип, сортування), хуки `useDebounce` та `useFetch`, кнопка скидання фільтрів |

Переглянути стан конкретної лабораторної:

```bash
git checkout lab2
```

Повернутись до актуальної версії:

```bash
git checkout main
```