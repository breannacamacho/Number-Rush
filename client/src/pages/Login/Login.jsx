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
import "./Login.css";

const Login = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data, loading }] = useMutation(LOGIN_USER);
  const [recognition, setRecognition] = useState(null);

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

  const startVoiceRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Sorry, your browser does not support speech recognition.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      console.log("Voice recognition started. Speak now.");
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("Voice command:", transcript);

      if (transcript.toLowerCase().includes("email")) {
        const email = transcript.split("email").pop().trim();
        setFormState((prevState) => ({ ...prevState, email }));
      } else if (transcript.toLowerCase().includes("password")) {
        const password = transcript.split("password").pop().trim();
        setFormState((prevState) => ({ ...prevState, password }));
      } else if (transcript.toLowerCase().includes("login")) {
        handleSubmit({ preventDefault: () => {} });
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
    };

    recognition.onend = () => {
      console.log("Voice recognition ended.");
    };

    recognition.start();
    setRecognition(recognition);
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Login</h2>
      {loading && <p className="loading-text">Logging in...</p>}
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
              aria-label="Email"
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
              aria-label="Password"
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
      <button onClick={startVoiceRecognition} className="voice-command-button">
        Use Voice Commands
      </button>
    </div>
  );
};

export default Login;