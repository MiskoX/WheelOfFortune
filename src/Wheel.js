import React from "react";

const Wheel = ({ onSpin, disabled }) => {
  const values = [0, 100, 200, 300, "Bankrut"];

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
