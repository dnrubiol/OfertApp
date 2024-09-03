import React from "react";
import Info from "./info";
import "./../../App.css";

const NumberBox = ({ name, onChange, label, currentValue, info }) => {
  return (
    <React.Fragment>
    <h4 className="general-text">{label}</h4>
    {info && <Info text={info} />}
    <input
      min="0"
      max={Number.MAX_SAFE_INTEGER}
      type="number"
      name={name}
      value={currentValue}
      className="form-control my-3"
      placeholder="Digita un numero"
      onChange={e => onChange(e.currentTarget.value)}
    />
    </React.Fragment>
  );
};

export default NumberBox;
