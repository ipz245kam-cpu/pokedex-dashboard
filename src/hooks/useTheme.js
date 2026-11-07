import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

/**
 * Доступ до теми через Context (без передавання props).
 * @returns {{ theme: 'light' | 'dark', toggleTheme: Function }}
 */
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme має використовуватись всередині ThemeProvider");
  }
  return ctx;
}