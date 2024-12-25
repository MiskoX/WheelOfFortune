import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PhraseSetupModal = ({ onSetup, chooser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const onSubmit = (data) => {
    const { phrase, category } = data;
    if (phrase.trim() && category.trim()) {
      onSetup(phrase.trim(), category.trim());
      reset(); // Clear form after submission
    } else {
      toast.warning("Proszę wprowadzić zarówno hasło, jak i kategorię.");
    }
  };

  return (
    <div className="Window">
      <h2>Wprowadź hasło i kategorię</h2>
      {chooser && <p>{chooser} ma teraz wpisać hasło i kategorię!</p>}
      {/* Display chooser */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            {...register("category", { required: "Kategoria jest wymagana" })}
            placeholder="Wprowadź kategorię"
          />
          {errors.category && (
            <p style={{ color: "red" }}>{errors.category.message}</p>
          )}
        </div>

        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            {...register("phrase", { required: "Hasło jest wymagane" })}
            placeholder="Wprowadź hasło"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            style={{
              position: "absolute",
              right: "0px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            aria-label={showPassword ? "Ukryj hasło" : "Pokaż hasło"}
          >
            {showPassword ? "👁️" : "🙈"}
          </button>
          {errors.phrase && (
            <p style={{ color: "red" }}>{errors.phrase.message}</p>
          )}
        </div>

        <button type="submit">Zatwierdź</button>
      </form>
    </div>
  );
};

export default PhraseSetupModal;
