import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";

const PlayerSetupModal = ({ onSetup }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      players: [{ name: "" }, { name: "" }, { name: "" }], // minimum 3 graczy
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "players",
  });

  const [chooser, setChooser] = useState(null);

  const handleAddPlayer = () => {
    append({ name: "" }); // Dodawanie gracza
  };

  const handleRemovePlayer = (index) => {
    if (fields.length > 3) {
      remove(index); // Usuwanie gracza, ale nie poniżej 3
    }
  };

  const handleChooserChange = (index) => {
    setChooser(index);
    clearErrors("chooser"); // Usuwanie błędu po wybraniu osoby
  };

  const onSubmit = (data) => {
    if (data.players.length < 3) {
      setError("players", {
        type: "manual",
        message: "Musisz dodać przynajmniej 3 graczy",
      });
      return;
    }

    if (chooser === null) {
      setError("chooser", {
        type: "manual",
        message: "Musisz wybrać osobę wybierającą hasło",
      });
      return;
    }

    const players = data.players.map((player) => player.name);
    onSetup(players, players[chooser]);
    reset(); // Resetowanie formularza po udanym przesłaniu
  };

  return (
    <div className="Window">
      <h2>Dodaj graczy</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((item, index) => (
          <div key={item.id}>
            <Controller
              name={`players[${index}].name`}
              control={control}
              defaultValue={item.name}
              rules={{ required: "Nazwa gracza jest wymagana" }}
              render={({ field }) => (
                <div className="InputGroup">
                  <label>
                    <input
                      type="radio"
                      name="chooser"
                      checked={chooser === index}
                      onChange={() => handleChooserChange(index)}
                    />
                  </label>
                  <input
                    type="text"
                    {...field}
                    placeholder={`Gracz ${index + 1}`}
                  />

                  <button
                    type="button"
                    onClick={() => handleRemovePlayer(index)}
                    disabled={fields.length <= 3}
                  >
                    Usuń
                  </button>
                  {errors.players?.[index]?.name && (
                    <p style={{ color: "red" }}>
                      {errors.players[index].name.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
        ))}

        <button type="button" onClick={handleAddPlayer}>
          +
        </button>

        {errors.players && (
          <p style={{ color: "red" }}>
            {errors.players.message || "Musisz dodać przynajmniej 3 graczy"}
          </p>
        )}

        {errors.chooser && (
          <p style={{ color: "red" }}>{errors.chooser.message}</p>
        )}

        <button type="submit">Zatwierdź</button>
      </form>
    </div>
  );
};

export default PlayerSetupModal;
