import Info from "./info";

const Input = ({ name, label, error, info, ...rest }) => {
  return (
    <div className="group-form general-text">
      <label htmlFor={name} className="general-text">
        {label} { info ? <Info text={info} /> : ""}
      </label>
      <input
        {...rest}
        className={"text-center " + (error ? "input error-input" : "input")}
        name={name}
        id={name}
      />
      {error && <div className="error-div">{error}</div>}
    </div>
  );
};

export default Input;
