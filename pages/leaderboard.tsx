import React from "react";
import { FaTrophy } from "react-icons/fa";
import useLeaderboard from "../hooks/useLeaderboard";

const Leaderboard = () => {
  const { leaderboard, loading } = useLeaderboard();

  console.log("leaderboard", leaderboard);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container p-6 mx-auto">
      <div className="flex items-center mb-6">
        <FaTrophy className="mr-4 text-4xl" />
        <h1 className="text-2xl font-bold">Leaderboard</h1>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="pb-4">#</th>
            <th className="pb-4">Name</th>
            <th className="pb-4">Quizzes</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((user, index) => (
            <tr key={user.id} className="border-t">
              <td className="py-4">{index + 1}</td>
              <td>{user.full_name}</td>
              <td>{user.quizzes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
