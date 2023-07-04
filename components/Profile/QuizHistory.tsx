// components/QuizHistoryComponent.tsx
import React from "react";
import { Quiz } from "../../interfaces/userProfile";
import { useAtom } from "jotai";
import { userProfileAtom } from "../../store/atom";

interface Props {
  quizHistory: Quiz[];
}

const QuizHistoryComponent: React.FC<Props> = () => {
  const [userProfile] = useAtom(userProfileAtom);

  return (
    <div className="w-2/3 p-10 mt-10 text-white bg-black rounded-md bg-opacity-90">
      <div className="">
        <h2 className="mb-5 text-2xl font-bold">Quiz History</h2>
        <div className="mt-2">
          {userProfile?.quizHistory?.map((quiz) => (
            <div
              key={quiz.id}
              className="flex items-center justify-between p-4 mt-2 rounded-md shadow bg-zinc-900"
            >
              <h3 className="text-lg font-bold">{quiz.name}</h3>
              <div>
                <p className="mt-2">Difficulty: {quiz.difficulty}</p>
                <p className="mt-1">
                  Score:{" "}
                  {(
                    (quiz.correctAnswers / quiz.numberOfQuestions) *
                    100
                  ).toFixed(0)}
                  % ({quiz.correctAnswers} out of {quiz.numberOfQuestions})
                </p>
                <p className="mt-1">
                  Date Taken: {new Date(quiz.dateTaken).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizHistoryComponent;
