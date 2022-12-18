import React, { useState } from "react";
import Input from "./common/Input";
import "./login-form.css";

const LoginForm = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("SUbmit clicked");
  };

  const handleChange = (e) => {
    const user = { ...data };
    user[e.target.name] = e.target.value;
    setData(user);
  };

  return (
    <div className="loginForm-wrap">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          value={data.username}
          name="username"
          label="Username"
          onChange={handleChange}
        />
        <Input
          value={data.password}
          name="password"
          label="Password"
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
