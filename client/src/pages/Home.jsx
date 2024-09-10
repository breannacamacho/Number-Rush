import React from 'react';
import { useQuery } from "@apollo/client";
import OperationsForm from "../components/OperationsForm"; 
import LeaderboardList from "../components/LeaderboardList/Leaderboard"; 
import { QUERY_DATA } from "../utils/queries"; 

const Home = () => {
  const { loading, error, data } = useQuery(QUERY_DATA); 
  const results = data?.results || []; 

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <main className="home-page">
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: "1px dotted #B22222", backgroundColor: "#FF8C00" }} 
        >
          <OperationsForm />
        </div>
        <div className='col-12 col-md-8 mb-3'>
          <LeaderboardList data={results} title='Leaderboard' /> 
        </div>
      </div>
    </main>
  );
};

export default Home;