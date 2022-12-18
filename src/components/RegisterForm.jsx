import React, { useState } from "react";
import Input from "./common/Input";
import "./register-form.css";

const RegisterForm = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
    name: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register form submit");
  };

  const handleChange = (e) => {
    const user = { ...data };
    user[e.target.name] = e.target.value;
    setData(user);
  };

  return (
    <div className="registerForm-wrap">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="name"
          value={data.name}
          label="Name"
          type="text"
          onChange={handleChange}
        />
        <Input
          name="username"
          value={data.username}
          label="Username"
          type="text"
          onChange={handleChange}
        />
        <Input
          name="password"
          label="Password"
          type="password"
          value={data.password}
          onChange={handleChange}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
