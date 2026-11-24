import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite, selectIsFavorite } from "../store/favoritesSlice";

/**
 * Кнопка додавання/видалення покемона з обраних.
 * Читає стан через селектор, змінює через dispatch.
 *
 * @param {{ id: number, size?: 'sm' | 'lg' }} props
 */
export function FavoriteButton({ id, size = "sm" }) {
  const dispatch = useDispatch();
  const isFavorite = useSelector(selectIsFavorite(id));

  return (
    <button
      type="button"
      className={"favorite-btn favorite-btn--" + size + (isFavorite ? " favorite-btn--active" : "")}
      onClick={(e) => {
        e.stopPropagation(); // щоб не спрацював клік по рядку таблиці
        dispatch(toggleFavorite(id));
      }}
      aria-label={isFavorite ? "Видалити з обраних" : "Додати до обраних"}
      title={isFavorite ? "Видалити з обраних" : "Додати до обраних"}
    >
      {isFavorite ? "★" : "☆"}
    </button>
  );
}