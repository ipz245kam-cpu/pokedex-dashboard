import { useDispatch, useSelector } from "react-redux";
import { selectTheme, toggleTheme } from "../store/themeSlice";
import { useEffect } from "react";

/**
 * Доступ до теми через Redux store.
 * Застосовує тему до <html> і зберігає в localStorage.
 * @returns {{ theme: 'light' | 'dark', toggleTheme: Function }}
 */
export function useTheme() {
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();

  // застосовуємо тему до <html> і запам'ятовуємо вибір
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("pokedex-theme", theme);
    } catch {
      // ігноруємо
    }
  }, [theme]);

  return {
    theme,
    toggleTheme: () => dispatch(toggleTheme()),
  };
}