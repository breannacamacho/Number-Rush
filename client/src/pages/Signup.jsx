import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Create Your Flashcard Account</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link> and start creating your flashcards.
              </p>
            ) : (
              //Username 
              <form onSubmit={handleFormSubmit}>
                <div className="from-group">
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
                  className="btn btn-block btn-primary"
                  style={{ cursor: 'pointer' }}
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
          </div>
        </div>
      </div>
    </main>
  );
};
                
  
export default Signup;
