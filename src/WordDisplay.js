import React, { useEffect, useState } from "react";

const WordDisplay = ({ phrase, guessedLetters }) => {
  // Rozdzielamy frazę na słowa, aby mieć kontrolę nad ich oddzielaniem
  const words = phrase.split(" ");

  // Stan, który będzie zarządzał animacjami
  const [animatedLetters, setAnimatedLetters] = useState({});

  // Hook efektu, aby animować odgadnięte litery po każdej zmianie guessedLetters
  useEffect(() => {
    const newAnimatedLetters = {};

    guessedLetters.forEach((letter) => {
      newAnimatedLetters[letter.toUpperCase()] = true;
    });

    setAnimatedLetters(newAnimatedLetters);
  }, [guessedLetters]);

  const display = words.map((word, wordIndex) => (
    <div key={wordIndex} className="Word">
      {word.split("").map((char, charIndex) => {
        const isGuessed = guessedLetters.includes(char.toUpperCase());
        const isAnimated = animatedLetters[char.toUpperCase()];

        return (
          <div
            key={charIndex}
            className={`Letter ${isGuessed ? "guessed" : "not-guessed"} ${
              isAnimated ? "rotate" : ""
            }`}
          >
            {isGuessed ? char.toUpperCase() : "_"}
          </div>
        );
      })}
    </div>
  ));

  return <p>{display}</p>;
};

export default WordDisplay;
