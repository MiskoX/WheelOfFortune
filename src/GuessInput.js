// GuessInput.js
import React, { useState } from "react";

const GuessInput = ({ onGuess }) => {
  const [guess, setGuess] = useState("");

  const handleGuess = () => {
    if (guess.trim().length === 1) {
      onGuess(guess.trim().toUpperCase());
      setGuess("");
    } else {
      alert("Wprowadź jedną literę.");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        maxLength={1}
        placeholder="Wprowadź literę"
      />
      <button onClick={handleGuess}>Zgadnij</button>
    </div>
  );
};

export default GuessInput;
