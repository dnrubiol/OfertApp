import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import { Link } from "react-router-dom";
import Autosuggest from "react-autosuggest";
import Info from "./info";
import DisplayErrors from "./Errors/displayErrors";
import "../../App.css";

class Form extends Component {
  state = {
    data: {},
    errors: {},

    // Errors gotten by server's response
    serverErrors: {}
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  fetchAutosuggestSuggestions = (value, options) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    const suggestions =
      inputLength === 0
        ? []
        : options.filter(
            (option) =>
              option.toLowerCase().slice(0, inputLength) === inputValue
          );

    return suggestions;
  };

  handleErrors = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    this.setState({ errors });
  };

  handleData = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  handleChange = (event) => {
    this.handleErrors(event);
    this.handleData(event);
  };

  renderAutosuggest(name, label, options, onSelect, info) {
    const { data } = this.state;

    const inputProps = {
      placeholder: "Escribe aquí",
      value: data[name],
      onChange: this.handleData,
      name,
      id: "name",
    };

    const suggestions = this.fetchAutosuggestSuggestions(data[name], options);

    return (
      <div>
        <label className="form-label general-text" htmlFor={name}>
          {label} { info ? <Info text={info} /> : "" }
        </label>
        <Autosuggest
          id={name}
          inputProps={inputProps}
          onSuggestionSelected={(event, { suggestion }) => {
            onSelect(suggestion); // Call the function defined specifically for handling this selection
          }}
          suggestions={suggestions}
          getSuggestionValue={(suggestion) => suggestion}
          renderSuggestion={(suggestion) => <div>{suggestion}</div>}
          onSuggestionsFetchRequested={({ value }) =>
            this.fetchAutosuggestSuggestions(value, options)
          }
          highlightFirstSuggestion
          onSuggestionsClearRequested={() => {}}
          renderSuggestionsContainer={({ containerProps, children, query }) => (
            <div {...containerProps}>
              <ul className="suggestion-list">{children}</ul>
            </div>
          )}
        />
      </div>
    );
  }

  renderButton(label) {
    /* General use button. If the form has a check T&C button, it will only 
    be active if they're accepted. If the form doesn't have T&C it will be active only with the JOI validation*/
    let termsConditionsAccepted = true;
    if (this.state.acceptedTermsConditions != null ) {
      termsConditionsAccepted = this.state.acceptedTermsConditions;
    }

    return (
      <button
        disabled={!(this.validate() === null && termsConditionsAccepted)}
        className="btn btn-form login-button"
      >
        {label}
      </button>
    );
  }

  renderReadOnlyLinkComponent(title, text, link) {
    return (
      <div>
        {title} <br />
        <Link to={link}>{text}</Link>
      </div>
    );
  }

  renderURLReadOnlyList(
    list_title,
    items,
    display_parameter,
    url_prefix,
    remove_function = null
  ) {
    /*
      list_title: string to be displayed as title of the list
      items: array of objects to be displayed in the list
      display_parameter: string with the name of the parameter to search in the items list
      url_prefix: URL prefix to be used in the links
    */
    if (!items) return null;
    return (
      <div>
        {list_title}
        <ul>
          {items.map((item) => (
            <li key={item["id"]}>
              <Link to={`/${url_prefix}/${item["id"]}/`}>
                {item[display_parameter]}
              </Link>
              <span>&nbsp;&nbsp;</span>
              {remove_function && (
                <button
                  style={{ fontSize: 10 }}
                  onClick={() => remove_function(item)}
                  className="btn btn-danger btn-sm"
                >
                  X
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  renderTermsConditionsCheckbox() {
    return (
      <div>
        <input
          type="checkbox"
          onChange={() => {
            this.setState({
              acceptedTermsConditions: !this.state.acceptedTermsConditions,
            });
          }}
        />
        <label className="general-text">
          <a target="_blank" href="[OfertApp] Políticas.pdf">
            Acepto los términos y condiciones de OfertApp
          </a>
        </label>  
      </div>
      
    );
  }

  renderInput(
    name, label, type = "text", readonly = false, 
    placeholder = "", defaultValue = null, info = null
  ) {
    const { data, errors } = this.state;

    return (
      <React.Fragment>
        <Input
          type={type}
          name={name}
          defaultValue={defaultValue || data[name] }
          placeholder={placeholder}
          label={label}
          info={info}
          readOnly={readonly}
          onChange={this.handleChange}
          error={errors[name]}
        />
      </React.Fragment>
      
    );
  }

  // Custom render marking errors
  generateErrorsDiv() {
    // Show all validation errors
    return (
      <DisplayErrors errors={this.state.serverErrors} />
    );
  }
}

export default Form;
