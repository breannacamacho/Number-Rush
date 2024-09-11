import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For fetching data from your server
import { Link } from 'react-router-dom'; // Import Link for navigation

const Profile = () => {
  const [topScores, setTopScores] = useState([]); // Initialize as an empty array
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  useEffect(() => {
    // Fetch the top scores when the component mounts
    const fetchTopScores = async () => {
      try {
        const response = await axios.get('/api/user/scores'); // Adjust this endpoint based on your API
        if (Array.isArray(response.data)) {
          setTopScores(response.data); // Ensure it's an array
        } else {
          setTopScores([]); // If it's not an array, set an empty array
        }
      } catch (error) {
        console.error('Error fetching scores:', error);
        setTopScores([]); // Set an empty array on error
      }
    };
    fetchTopScores();
  }, []);

  // Handle profile photo upload
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setProfilePhoto(file);
    setPhotoPreview(URL.createObjectURL(file)); // For previewing the uploaded photo
  };

  const handlePhotoUpload = async () => {
    const formData = new FormData();
    formData.append('profilePhoto', profilePhoto);

    try {
      await axios.post('/api/user/uploadPhoto', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Profile photo uploaded successfully!');
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert('Failed to upload profile photo.');
    }
  };

  // Group scores by operation type and time selected
  const groupedScores = topScores.reduce((acc, score) => {
    const key = `${score.operation} - ${score.timeLimit}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(score);
    return acc;
  }, {});

  return (
    <div className="profile-page">
      <h1>Your Profile</h1>
      
      {/* Profile Photo Upload */}
      <div className="profile-photo-section">
        <h2>Upload Profile Photo</h2>
        <input type="file" accept="image/*" onChange={handlePhotoChange} />
        {photoPreview && <img src={photoPreview} alt="Profile Preview" className="photo-preview" />}
        <button onClick={handlePhotoUpload}>Upload Photo</button>
      </div>

      {/* Displaying Top Scores */}
      <div className="top-scores-section">
        <h2>Your Top 10 Scores</h2>
        {Object.keys(groupedScores).length > 0 ? (
          Object.keys(groupedScores).map((category) => (
            <div key={category} className="score-category">
              <h3>{category}</h3>
              <ul>
                {groupedScores[category]
                  .slice(0, 10)
                  .map((score, index) => (
                    <li key={index}>
                      Score: {score.value} - Date: {new Date(score.date).toLocaleDateString()}
                    </li>
                  ))}
              </ul>
            </div>
          ))
        ) : (
          <p>No scores available.</p>
        )}
      </div>

      {/* Practice More Button */}
      <div className="practice-more-section">
        <Link to="/mathgame">
          <button className="practice-more-button">
            Practice More!
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;