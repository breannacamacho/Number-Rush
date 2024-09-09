import { useQuery } from "@apollo/client";

import LeaderboardList from "../components/LeaderboardList";
import OperationsForm from "../components/OperationsForm"; 

import { QUERY_DATA } from "../utils/queries"; 

const Home = () => {
  const { loading, data } = useQuery(QUERY_DATA); 
  const results = data?.results || []; 

  return (
    <main>
      <div className='flex-row justify-center'>
        <div
          className='col-12 col-md-10 mb-3 p-3'
          style={{ border: "1px dotted #1a1a1a" }}
        >
          <OperationsForm />
        </div>
        <div className='col-12 col-md-8 mb-3'>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <LeaderboardList data={results} title='Leaderboard' /> 
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
