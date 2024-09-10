import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";  
import Auth from "../../utils/auth";
import "./Login.css";  

const Login = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Login</h2>
      {data ? (
        <p className="success-message">Login successful!</p>
      ) : (
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="login-label">Email:</label>
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              className="login-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="login-label">Password:</label>
            <input
              type="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
              className="login-input"
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {error && <p className="error-text">Login failed: {error.message}</p>}
        </form>
      )}
      <p className="signup-text">
        Don't have an account? <a href="/signup">Sign up here</a>.
      </p>
    </div>
  );
};

export default Login;