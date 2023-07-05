import React, { useState } from "react";
import { FaTrophy } from "react-icons/fa";
import useLeaderboard from "../hooks/useLeaderboard";
import { Switch } from "@headlessui/react";

const Leaderboard = () => {
  const { leaderboard, loading } = useLeaderboard();
  const [isMonthly, setIsMonthly] = useState(false);

  const rankColors = [
    "from-yellow-500 via-orange-700 to-red-600",
    "from-green-500 to-blue-600",
    "from-purple-400 to-indigo-500",
  ];

  const handleSwitch = () => {
    setIsMonthly(!isMonthly);
    // Switch leaderboard data here...
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center w-full px-6 py-10 mx-auto text-white bg-black bg-opacity-90">
      <div className="w-2/3">
        <div className="flex items-center mb-6">
          <FaTrophy className="w-10 h-10 mr-4 text-yellow-400" />
          <h1 className="text-2xl font-bold">Leaderboard</h1>
        </div>
        <Switch.Group>
          <Switch.Label className="mr-4">Daily</Switch.Label>
          <Switch
            checked={isMonthly}
            onChange={handleSwitch}
            className={`${isMonthly ? "bg-blue-400" : "bg-blue-200"}
                        relative inline-flex items-center h-6 rounded-full w-11`}
          >
            <span
              className={`${isMonthly ? "translate-x-6" : "translate-x-1"}
                          inline-block w-4 h-4 transform bg-white rounded-full`}
            />
          </Switch>
          <Switch.Label className="ml-4">Monthly</Switch.Label>
        </Switch.Group>
        {leaderboard.map((user, index) => (
          <div
            key={user.id}
            className={`flex items-center py-4 space-x-4 relative ${
              index < 2 ? "mt-8" : index == 2 ? "my-8" : ""
            } bg-gradient-to-r ${
              rankColors[index] || "from-zinc-800 to-zinc-700"
            } rounded-xl`}
          >
            <span className="text-4xl font-semibold">{index + 1}</span>
            <img
              src={user.avatar_url}
              alt={user.name}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex flex-col">
              <a
                href={user.avatar_url}
                className="text-lg font-bold hover:text-blue-300"
              >
                {user.name}
              </a>
            </div>
            <span className="absolute right-5">{user.quizzes} quizzes</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
