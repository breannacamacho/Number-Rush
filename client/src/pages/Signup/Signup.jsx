import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations'; 
import Auth from '../../utils/auth';
import './Signup.css'; 

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [addUser, { error, data, loading }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
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

      if (transcript.toLowerCase().includes("username")) {
        const username = transcript.split("username").pop().trim();
        setFormState((prevState) => ({ ...prevState, username }));
      } else if (transcript.toLowerCase().includes("email")) {
        const email = transcript.split("email").pop().trim();
        setFormState((prevState) => ({ ...prevState, email }));
      } else if (transcript.toLowerCase().includes("password")) {
        const password = transcript.split("password").pop().trim();
        setFormState((prevState) => ({ ...prevState, password }));
      } else if (transcript.toLowerCase().includes("sign up")) {
        handleFormSubmit({ preventDefault: () => {} });
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
    };

    recognition.onend = () => {
      console.log("Voice recognition ended.");
    };

    recognition.start();
  };

  return (
    <main className="flex-row justify-center mb-4 signup-page">
      <div className="col-12 col-lg-8">
        <div className="card signup-card">
          <h4 className="card-header bg-primary text-light p-2">Create Your Account</h4>
          <div className="card-body">
            {loading && <p className="loading-text">Creating account...</p>}
            {data ? (
              <p>
                Success! <Link to="/">Back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    id="username"
                    className="form-input"
                    placeholder="Choose a username"
                    name="username"
                    type="text"
                    value={formState.username}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    className="form-input"
                    placeholder="Enter your email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    className="form-input"
                    placeholder="Enter your password"
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  className="btn btn-block signup-button"
                  type="submit"
                >
                  Sign Up
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                Something went wrong: {error.message}
              </div>
            )}

            <button onClick={startVoiceRecognition} className="voice-command-button">
              Use Voice Commands
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
