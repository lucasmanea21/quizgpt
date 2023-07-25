import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
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

  const handleImageError = (e) => {
    e.target.src = null;
    e.target.onError = null;
    e.target.style.display = "none";
  };

  // if (loading) return <p>Loading...</p>;

  return (
    <div className="flex justify-center w-full h-screen pt-16 mx-auto text-white bg-black bg-opacity-95">
      <div className="w-full mx-5 md:w-3/4">
        <div className="mb-10">
          <h1 className="mb-2 text-4xl font-bold ">Leaderboard</h1>
          {/* <p className="text-gray-300 text-md">
            The most knowledgeable.
          </p> */}
        </div>
        {!loading ? (
          <>
            {/* <Switch.Group>
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
            </Switch.Group> */}
            {leaderboard.map((user, index) => {
              return (
                <div
                  key={user.id}
                  className={`flex items-center py-4 space-x-4 relative ${
                    index < 2 ? "mt-3" : index == 2 ? "my-3" : ""
                  } bg-gradient-to-r ${
                    rankColors[index] || "bg-zinc-950 my-1"
                  } rounded-xl`}
                >
                  <span className="mx-6 text-xl font-semibold">
                    {index + 1}
                  </span>

                  {!user.avatar_url ? (
                    <FaUser className="w-8 h-8 rounded-full" />
                  ) : (
                    <img
                      src={user.avatar_url}
                      alt={user.name}
                      className="w-12 h-12 rounded-full"
                      onError={handleImageError}
                    />
                  )}
                  <div className="flex flex-col">
                    <a
                      href={`/profile/${user.id}`}
                      className="text-lg font-semibold"
                    >
                      {user.name}
                    </a>
                  </div>
                  <span className="absolute right-5">
                    {user.quizzes} quizzes
                  </span>
                </div>
              );
            })}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
