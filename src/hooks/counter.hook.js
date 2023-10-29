import { useState } from "react";

export const useCounter = (initialState = 1) => {

  const [count, setCount] = useState(initialState);

  const handleIncrement = (e) => {
    e.preventDefault();
    setCount(count + 1);
  }

  const handleDecrement = (e) => {
    e.preventDefault();
    setCount(count - 1);
  }

  return {count, handleIncrement, handleDecrement}
}
