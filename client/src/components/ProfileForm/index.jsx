import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../utils/mutations'; 
import './ProfileForm.css'; 

const ProfileForm = ({ user }) => {
  const [formState, setFormState] = useState({
    username: user.username || '',
    email: user.email || ''
  });
  const [updateUser, { error, data }] = useMutation(UPDATE_USER);

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
      const { data } = await updateUser({
        variables: { ...formState },
      });
      console.log('Profile updated:', data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="profile-form-container">
      <h2 className="profile-form-heading">Update Profile</h2>
      {data ? (
        <p className="success-message">Profile updated successfully!</p>
      ) : (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              value={formState.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="profile-form-button">Update Profile</button>
          {error && <p className="error-text">Update failed: {error.message}</p>}
        </form>
      )}
    </div>
  );
};

export default ProfileForm