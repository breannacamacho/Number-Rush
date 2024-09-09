import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME, QUERY_SCORES } from '../utils/queries'; 
import Auth from '../utils/auth';
import ScoreList from '../components/LeaderboardList/Scoreboard'; // this assume's you have a component to display scores
// import ProfileForm from '../components/ProfileForm'; // this assume's you have a component to update profile

const Profile = () => {
  const { username: userParam } = useParams();

  // Query to get user data or the logged-in user's data
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  // Query to get user scores
  const { loading: loadingScores, data: scoresData } = useQuery(QUERY_SCORES);

  const user = data?.me || data?.user || {};
  const scores = scoresData?.scores || [];

  // Redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to='/me' />;
  }

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (loadingScores) {
    return <div>Loading scores...</div>;
  }

  if (!user) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  if (scores.length === 0) {
    return <h4>No scores to display</h4>;
  }

  return (
    <div>
      <div className='flex-row justify-center mb-3'>
        <h2 className='col-12 col-md-10 bg-dark text-light p-3 mb-5'>
          Viewing {userParam ? `${user.username}'s` : "your"} profile.
        </h2>

        <div className='col-12 col-md-10 mb-5'>
          <ScoreList scores={scores} title='Your Quiz Scores' />
        </div>

        <div
          className='col-12 col-md-10 mb-3 p-3'
          style={{ border: "1px dotted #1a1a1a" }}
        >
          <ProfileForm user={user} />
        </div>
      </div>
    </div>
  );
};

export default Profile;


