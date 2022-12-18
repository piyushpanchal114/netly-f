import React from "react";
import "./input.css";

const Input = ({ name, label, value, type, onChange }) => (
  <div className="input-box">
    <label htmlFor={value}>{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      id={name}
      name={name}
    />
  </div>
);

export default Input;
