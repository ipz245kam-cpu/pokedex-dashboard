# Pokédex Dashboard

Навчальний React-дашборд на тему Покедекс (варіант А). Дані беруться з [PokeAPI](https://pokeapi.co).

## Стек

- React + Vite
- React Router v7
- PokeAPI (REST)
- ESLint

## Запуск

```bash
npm install
npm run dev
```

Після запуску відкрий адресу з консолі (зазвичай `http://localhost:5173`).

## Маршрути

| Шлях | Сторінка |
|------|----------|
| `/` | Дашборд: фільтри, KPI, таблиця покемонів |
| `/pokemon/:id` | Деталі покемона (id береться з параметра маршруту) |
| `*` | Сторінка 404 |

Для неіснуючого `id` на сторінці деталей показується повідомлення «не знайдено».

## Структура проєкту

```
src/
├── api/
│   └── pokeapi.js              # запити до PokeAPI
├── components/
│   ├── Layout.jsx              # спільна шапка + Outlet
│   ├── KpiSection.jsx          # KPI-картки
│   ├── PokemonTable.jsx        # таблиця (рядок веде на деталі)
│   ├── SortControls.jsx        # сортування (читає фільтри з Context)
│   ├── StatusView.jsx          # стани loading / error
│   ├── ThemeToggle.jsx         # перемикач теми
│   └── TypeFilter.jsx          # фільтр за типом (читає фільтри з Context)
├── context/
│   ├── ThemeContext.js
│   ├── ThemeProvider.jsx       # світла / темна тема
│   ├── FiltersContext.js
│   └── FiltersProvider.jsx     # пошук, тип, сортування
├── hooks/
│   ├── useDebounce.js
│   ├── useFetch.js
│   ├── useFilters.js
│   ├── usePokemonDetails.js
│   ├── usePokemonList.js
│   └── useTheme.js
├── pages/
│   ├── DashboardPage.jsx
│   ├── PokemonDetailsPage.jsx
│   └── NotFoundPage.jsx
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
| ЛР4 | `lab4` | React Router, дрілдаун на сторінку деталей, `ThemeContext`, `FiltersContext`, обробка неіснуючого id |

Переглянути стан конкретної лабораторної:

```bash
git checkout lab2
```

Повернутись до актуальної версії:

```bash
git checkout main
```

Робота над ЛР4 велась у гілці `lab4`.