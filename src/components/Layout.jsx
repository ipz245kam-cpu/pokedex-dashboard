import { NavLink, Outlet } from "react-router";
import { ThemeToggle } from "./ThemeToggle";

export function Layout() {
  return (
    <div className="layout">
      <header className="layout__header">
        <NavLink to="/" className="layout__brand">
          Покедекс
        </NavLink>
        <ThemeToggle />
      </header>

      <main className="layout__content">
        <Outlet />
      </main>
    </div>
  );
}