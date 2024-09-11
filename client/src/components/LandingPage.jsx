import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h1>Welcome to Number Rush!</h1>
      <p>Please log in or sign up to continue.</p>
      <div className="auth-buttons">
        {/* Link to /login, not /app/login */}
        <Link to="/login">
          <button>Login</button>
        </Link>
        {/* Link to /signup */}
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;