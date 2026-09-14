// src/components/Counter.jsx
import { useState } from "react";

function Counter({ label = "Caught Pokémon", initialValue = 0 }) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => Math.max(0, prev - 1));
  const reset = () => setCount(initialValue);

  return (
    <div className="counter">
      <p className="counter__label">{label}</p>
      <p className="counter__value">{count}</p>
      <div className="counter__buttons">
        <button onClick={decrement}>−</button>
        <button onClick={reset}>Reset</button>
        <button onClick={increment}>+</button>
      </div>
    </div>
  );
}

export default Counter;