// src/components/Toggle.jsx
import { useState } from "react";

function Toggle({ labelOn = "Детальний режим", labelOff = "Простий режим" }) {
  const [isDetailed, setIsDetailed] = useState(false);

  const handleToggle = () => setIsDetailed((prev) => !prev);

  return (
    <div className="toggle">
      <div className="toggle__header">
        <span>{isDetailed ? labelOn : labelOff}</span>
        <button
          className={
            "toggle__switch " + (isDetailed ? "toggle__switch--on" : "")
          }
          onClick={handleToggle}
          aria-pressed={isDetailed}
        >
          <span className="toggle__knob" />
        </button>
      </div>

      {isDetailed ? (
        <p className="toggle__info">
          Показуються всі 6 статів: HP, Attack, Defense, Sp.Attack, Sp.Defense, Speed
        </p>
      ) : (
        <p className="toggle__info">
          Показуються лише базові стати: HP, Attack, Defense
        </p>
      )}
    </div>
  );
}

export default Toggle;