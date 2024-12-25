import React from "react";

const Wheel = ({ onSpin, disabled }) => {
  const values = [
    300,
    1000,
    50,
    100,
    200,
    600,
    200,
    500,
    100,
    100,
    800,
    900,
    50,
    400,
    500,
    "Bankrut",
    700,
    300,
    0,
    400,
  ];

  const spinWheel = () => {
    const result = values[Math.floor(Math.random() * values.length)];
    onSpin(result);
  };

  return (
    <div>
      <button className={"SpinButton"} onClick={spinWheel} disabled={disabled}>
        Kręć kołem!
      </button>
      {disabled && <p>Nie możesz teraz kręcić kołem.</p>}
    </div>
  );
};

export default Wheel;
