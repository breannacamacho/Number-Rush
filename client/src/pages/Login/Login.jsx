import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";  
import Auth from "../../utils/auth";
import { useNavigate } from 'react-router-dom'; 
import "./Login.css";  

const Login = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const navigate = useNavigate(); 

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Working!!"); 
    try {
      console.log(formState);
      const { data } = await login({
        variables: { formState },
      });
      Auth.login(data.login.token); // Log the user in
      navigate('/mathgame'); // Redirect to MathGame after login
    } catch (e) {
      console.error("Error during login:", e);
    }
  };


  return (
    <div className="login-container">
      <h2 className="login-heading">Login</h2>
      {data ? (
        <p className="success-message">Login successful!</p>
      ) : (
        <form className="login-form">
          <div className="form-group">
            {/* Add the `for` and corresponding `id` */}
            <label htmlFor="email" className="login-label">Email:</label>
            <input
              type="email"
              name="email"
              id="email" // Add id here
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
              id="password" // Add id here
              value={formState.password}
              onChange={handleChange}
              className="login-input"
              required
            />
          </div>
          <button type="submit" className="login-button" onClick={handleSubmit}>
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