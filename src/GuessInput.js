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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleGuess();
    }
  };

  return (
    <div>
      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        onKeyDown={handleKeyPress}
        maxLength={1}
        placeholder="Wprowadź literę"
      />
      <button className={"SpinButton"} onClick={handleGuess}>
        Zgadnij
      </button>
    </div>
  );
};

export default GuessInput;
