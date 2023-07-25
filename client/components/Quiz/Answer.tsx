// components/Answer.tsx
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import useProfile from "../../hooks/useProfile";
import { useResponses } from "../../hooks/useResponses";
import { useAtom } from "jotai";
import { correctAnswerAtom } from "../../store/atom";
import { FaCheck, FaTimes } from "react-icons/fa";

interface AnswerProps {
  roomId: string;
  questionIndex: number;
  question: any;
  quizId: string;
  setShowAnswer: any;
  handleNextQuestion: any;
}

export const Answer: React.FC<AnswerProps> = ({
  roomId,
  questionIndex,
  question,
  quizId,
  setShowAnswer,
  handleNextQuestion,
}) => {
  const { responses, loading } = useResponses(quizId, roomId, questionIndex);

  console.log("responses", responses);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4 text-white bg-zinc-950 rounded-md shadow-lg md:p-8 max-w-[750px]">
      <h5 className="text-lg md:text-xl">Question {questionIndex}</h5>
      <h2 className="mb-3 text-xl font-bold md:text-2xl">
        {question?.question}
      </h2>
      <div className="mt-8 mb-5 p-5 rounded-xl bg-zinc-900 text-white">
        <h2 className="mb-2 text-2xl font-semibold text--200">
          Correct Answer:
        </h2>
        <p className="text-lg text-gray-100">{question?.correct}</p>
      </div>
      {responses.map((response, key) => {
        console.log("response, correct", response, question?.correct);
        return (
          <div
            key={response.user_id}
            className="p-5 rounded-xl bg-zinc-950 text-white"
          >
            <div className="grid items-center grid-cols-3 gap-4">
              <div className="flex items-center">
                <img
                  className="w-10 h-10 mr-3 rounded-full"
                  src={response.profile.avatar_url}
                  alt="User Avatar"
                />
                <h3 className="font-semibold text-gray-100 text-md">
                  {response.profile.name}
                </h3>
              </div>
              <div className="col-span-2">
                <div
                  className={`w-full rounded-md p-3 flex flex-col space-y-1 ${
                    response.answer == question?.correct
                      ? "bg-green-800"
                      : "bg-red-800"
                  }  `}
                >
                  {/* <span className="text-xs text-gray-200">User's Answer</span> */}
                  <span className="text-gray-200 text-md">
                    {response.answer}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="flex justify-end mt-8">
        <button
          className="py-2 px-3 text-white bg-blue-500 rounded-lg"
          // onClick={nextQuestion}
          onClick={() => {
            handleNextQuestion();
            setShowAnswer(false);
          }}
        >
          Next Question
        </button>
      </div>
    </div>
  );
};
