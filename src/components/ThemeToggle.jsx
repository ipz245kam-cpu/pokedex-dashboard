import { useTheme } from "../hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button type="button" className="theme-toggle" onClick={toggleTheme}>
      {theme === "light" ? "🌙 Темна тема" : "☀️ Світла тема"}
    </button>
  );
}