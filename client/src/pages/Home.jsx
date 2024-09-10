import { useQuery } from "@apollo/client";
import LeaderboardList from "../components/LeaderboardList/Leaderboard";
import OperationsForm from "../components/OperationsForm"; 
import { QUERY_DATA } from "../utils/queries"; 

const Home = () => {
  const { loading, data, error } = useQuery(QUERY_DATA); 
  const results = data?.results || [];

  return (
    <main className="home-page">
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: "1px dotted #B22222", backgroundColor: "#FF8C00" }} 
        >
          <OperationsForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div style={{ color: "#FFD700", textAlign: "center" }}>Loading...</div> 
          ) : error ? (
            <div style={{ color: "#B22222", textAlign: "center" }}>Failed to load data. Please try again later.</div> 
          ) : (
            <LeaderboardList data={results} title="Leaderboard" />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;