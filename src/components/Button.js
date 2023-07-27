import React from "react";

const Button = ({ isActive, clicked }) => {
  return (
    <div>
      <button onClick={clicked}>
        {isActive ? "Generate another user" : "Generate User"}
      </button>
    </div>
  );
};

export default Button;
