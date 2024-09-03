import React from "react";
import Info from "./info";

const SearchBox = ({ onChange, label, value, info }) => {
  return (
    <React.Fragment>
    <h4 className="general-text">{label}</h4>
    {info && <Info text={info} />}
    <input
      type="text"
      name="query"
      className="form-control my-3"
      placeholder="Search..."
      value={value}
      onChange={e => onChange(e.currentTarget.value)}
    />
    </React.Fragment>
  );
};

export default SearchBox;
