import React, { useState } from "react";
import PlayerSetupModal from "./PlayerSetupModal";
import PhraseSetupModal from "./PhraseSetupModal";
import Wheel from "./Wheel";
import WordDisplay from "./WordDisplay";
import GuessInput from "./GuessInput";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const Game = () => {
  const [players, setPlayers] = useState([]);
  const [chooser, setChooser] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [phrase, setPhrase] = useState("");
  const [category, setCategory] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [scores, setScores] = useState({});
  const [turn, setTurn] = useState(0);
  const [wheelValue, setWheelValue] = useState(null);
  const [canGuess, setCanGuess] = useState(false);

  const handlePlayersSetup = (newPlayers, chosenChooser) => {
    setPlayers(newPlayers);
    setChooser(chosenChooser);
    const updatedPlayers = newPlayers.filter(
      (player) => player !== chosenChooser
    );
    setPlayers(updatedPlayers);
    toast.info(`${chosenChooser} wybiera hasło i kategorię.`);
  };

  const handlePhraseSetup = (newPhrase, newCategory) => {
    setPhrase(newPhrase);
    setCategory(newCategory);
    const remainingPlayers = players.filter(
      (player) => player !== newPhrase.chooser
    );
    setPlayers(remainingPlayers);
    setCurrentPlayer(
      remainingPlayers[Math.floor(Math.random() * remainingPlayers.length)]
    );
    setScores(Object.fromEntries(remainingPlayers.map((p) => [p, 0])));
  };

  const handleSpin = (value) => {
    setWheelValue(value);
    setCanGuess(value > 0);

    if (value === "Bankrut") {
      toast.error(`${currentPlayer} traci wszystkie punkty i kolejkę!`);
      setScores({ ...scores, [currentPlayer]: 0 });
      nextTurn();
    } else if (value === 0) {
      toast.warning("Wylosowano 0, kolejka przechodzi na następnego gracza.");
      nextTurn();
    } else {
      toast.success(
        `${currentPlayer} wylosował ${value} punktów! Teraz zgadnij literkę.`
      );
    }
  };

  const handleGuess = (letter) => {
    if (guessedLetters.includes(letter)) {
      toast.warning("Ta litera już została zgadnięta!");
      nextTurn();
      return;
    }

    setGuessedLetters([...guessedLetters, letter]);

    if (phrase.toUpperCase().includes(letter)) {
      const count =
        phrase.split(" ").join("").toUpperCase().split(letter).length - 1;
      const points = count * wheelValue;
      setScores({ ...scores, [currentPlayer]: scores[currentPlayer] + points });

      toast.success(`Dobra litera! Zdobywasz ${points} punktów.`);

      const allRevealed = phrase
        .toUpperCase()
        .split("")
        .every(
          (char) =>
            char === " " ||
            guessedLetters.includes(char) ||
            char.toUpperCase() === letter
        );

      if (allRevealed) {
        toast.success(`${currentPlayer} wygrywa grę! Gratulacje!`);
        return;
      }

      setCanGuess(false); // Disable guessing again
    } else {
      toast.error("Zła litera!");
      nextTurn();
    }
  };

  const handleRevealAll = () => {
    setGuessedLetters(phrase.toUpperCase().split(""));
    toast.success("Wszystkie litery zostały odsłonięte!");
  };

  const handleGuessPhrase = (guessedPhrase) => {
    if (guessedPhrase.toUpperCase() === phrase.toUpperCase()) {
      toast.success(`${currentPlayer} odgadł całe hasło! Gratulacje!`);
      setGuessedLetters(phrase.toUpperCase().split(""));
    } else {
      toast.error("Nieprawidłowe hasło!");
      nextTurn();
    }
  };

  const nextTurn = () => {
    const nextPlayerIndex = (turn + 1) % players.length;
    setTurn(nextPlayerIndex);
    setCurrentPlayer(players[nextPlayerIndex]);
    setWheelValue(null);
    setCanGuess(false);
  };

  return (
    <div className="Game">
      <ToastContainer />
      {!players.length ? (
        <PlayerSetupModal onSetup={handlePlayersSetup} />
      ) : !phrase ? (
        <PhraseSetupModal onSetup={handlePhraseSetup} chooser={chooser} />
      ) : (
        <>
          <div className="Window">
            <button className="ShowAllButton" onClick={() => handleRevealAll()}>
              Odsłoń wszystkie litery
            </button>
            <h1>Koło Fortuny</h1>
            <p>Gracz: {currentPlayer}</p>
            <p>Kategoria: {category}</p>
            <WordDisplay phrase={phrase} guessedLetters={guessedLetters} />

            {!canGuess && <Wheel onSpin={handleSpin} />}
            {canGuess && (
              <>
                <GuessInput onGuess={handleGuess} />
                <input
                  type="text"
                  placeholder="Odgadnij całe hasło"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleGuessPhrase(e.target.value);
                      e.target.value = "";
                    }
                  }}
                />
              </>
            )}
          </div>
          <div className="Score">
            <h2>Tablica punktów</h2>
            <ul>
              {Object.entries(scores).map(([player, score]) => (
                <li key={player}>
                  {player}: {score} punktów
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Game;
