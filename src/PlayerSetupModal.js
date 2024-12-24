import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";

const PlayerSetupModal = ({ onSetup }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    defaultValues: {
      players: [{ name: "" }, { name: "" }, { name: "" }], // minimum 3 graczy
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "players",
  });

  const handleAddPlayer = () => {
    append({ name: "" }); // Dodawanie gracza
  };

  const handleRemovePlayer = (index) => {
    if (fields.length > 3) {
      remove(index); // Usuwanie gracza, ale nie poniżej 3
    }
  };

  const onSubmit = (data) => {
    if (data.players.length < 3) {
      setError("players", {
        type: "manual",
        message: "Musisz dodać przynajmniej 3 graczy",
      });
      return;
    }

    const players = data.players.map((player) => player.name);
    onSetup(players);
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
                  <input {...field} placeholder={`Gracz ${index + 1}`} />
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

        <button type="submit">Zatwierdź</button>
      </form>
    </div>
  );
};

export default PlayerSetupModal;
