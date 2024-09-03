import React from 'react';
import Info from "./info";
import "./../../App.css";

const ComboBox = ({ label, options, onChange, currentValue, info}) => {
    return (
        <React.Fragment>
            <h5 className="group-form general-text">
                {label} { info ? <Info text={info} /> : "" }
            </h5>
            <select
                className="form-select"
                onChange={e => onChange(e.currentTarget.value)}
                value={currentValue}
            >
                {options.map(option => (
                    <option key={option.name} value={option.name}>
                        {option.label}
                    </option>
                ))}
            </select>
        </React.Fragment>
    );
}

export default ComboBox;