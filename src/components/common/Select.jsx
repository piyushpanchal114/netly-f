import React from "react";
import "./select.css";

const Select = ({ name, label, options, ...rest }) => {
  return (
    <div className="select-box">
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} {...rest}>
        <option value="" />
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
