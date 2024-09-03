import React from "react";
import Info from "./info";
import "./../../App.css";

const CheckBox = ({ name, label, onChange, value, info }) => {
    return (
        <React.Fragment>
        <input
            type="checkbox"
            className="form-check-input general-text"
            name={name}
            id={name}
            checked={value}
            onChange={e => onChange(e.currentTarget.checked)}
        />
        <h5 className="general-text">{label}</h5>
        {info && <Info text={info} />}
        </React.Fragment>
    );
}

export default CheckBox;