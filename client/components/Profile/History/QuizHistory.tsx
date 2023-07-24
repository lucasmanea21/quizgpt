import React, { useState } from "react";
import { useAtom } from "jotai";
import { userProfileAtom } from "../../../store/atom";
import { Quiz } from "../../../interfaces/userProfile";

const QuizHistoryComponent: React.FC = () => {
  const [userProfile] = useAtom(userProfileAtom);
  const [visibleCount, setVisibleCount] = useState(2); // initialise to 2 quizzes visible

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 2); // show 2 more quizzes each time the button is clicked
  };

  return (
    <div className="w-3/4 p-10 mt-10 text-white rounded-md bg-zinc-950 bg-opacity-90">
      <h2 className="mb-5 text-2xl font-bold">Quiz History</h2>
      <div className="mt-2 space-y-4">
        {userProfile?.quizHistory?.slice(0, visibleCount).map((quiz) => (
          <div
            key={quiz.id}
            className="flex items-center justify-between p-4 rounded-md shadow bg-zinc-900"
          >
            <h3 className="text-lg font-bold">{quiz.name}</h3>
            <div>
              <p className="mt-2">Difficulty: {quiz.difficulty}</p>
              <p className="mt-1">
                Score:{" "}
                {((quiz.correctAnswers / quiz.numberOfQuestions) * 100).toFixed(
                  0
                )}
                % ({quiz.correctAnswers} out of {quiz.numberOfQuestions})
              </p>
              <p className="mt-1">
                Date Taken: {new Date(quiz.dateTaken).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
      {visibleCount < userProfile?.quizHistory?.length && (
        <button
          className="p-2 mt-2 text-lg font-bold text-white rounded bg-gradient-to-r from-zinc-900 to-zinc-800 hover:from-blue-500 hover:to-teal-400"
          onClick={handleShowMore}
        >
          Show more <span className="ml-2">&#8595;</span>
        </button>
      )}
    </div>
  );
};

export default QuizHistoryComponent;
