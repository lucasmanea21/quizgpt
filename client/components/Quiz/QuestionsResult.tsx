import React from "react";
import Link from "next/link";
import { FaCheck, FaMedal, FaStar, FaTimes } from "react-icons/fa";

const QuestionResult = ({ questions, userAnswers }: any) => {
  const percentile = userAnswers.filter((item: any) => item.correct).length;

  return (
    <div className="text-white max-w-[900px] ">
      <div className="flex flex-col items-center justify-center w-full p-6 text-white rounded-lg bg-zinc-950">
        <div className="relative grid w-full p-5 overflow-hidden h-30 place-items-center">
          <span className="relative font-semibold text-9xl">
            {Math.round((percentile / questions.length) * 100)}%
          </span>
          {/* <img
            className="absolute top-0 left-0 z-0 object-cover w-full h-full opacity-60"
            src={Image}
            alt="result"
          /> */}
        </div>
        <p className="my-4 font-medium text-center text-md text-text-color ">
          You answered {percentile} out of {questions.length} questions
          correctly!
        </p>
        <Link
          href="/"
          className="block w-full px-2 py-2 mt-2 text-lg font-semibold text-center text-white bg-blue-500 border-none rounded-lg outline-none cursor-pointer md:w-1/3 bg-opacity-70 text-text-color"
        >
          Start a new quiz!
        </Link>
      </div>

      <div className="flex flex-col mt-5 mb-10 space-y-3">
        {/* <div className="flex flex-col items-center justify-between w-full p-4 space-y-3 text-white rounded-lg shadow md:space-y-0 md:flex-row bg-gradient-to-r from-green-900 to-blue-500"> */}
        <div className="flex flex-col items-center justify-between w-full p-4 space-y-3 text-white rounded-lg shadow md:space-y-0 md:flex-row bg-zinc-950">
          <div className="flex items-center">
            <FaStar className="mr-2" />
            <p>
              {/* <strong>Points Earned:</strong> {points} */}
              <strong>Points Earned:</strong> 124
            </p>
          </div>
          <div className="flex items-center">
            <FaMedal className="mr-2" />
            <p>
              <strong>XP Gained:</strong> 520
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-3">
        <h1 className="mb-3 text-3xl">Questions & Answers</h1>
        {questions.map((item, key) => {
          console.log();
          return (
            <div key={key} className={`p-5 rounded-xl bg-zinc-950 text-white `}>
              <div className="grid items-center grid-cols-2 gap-4">
                <div>
                  <p className="mb-2 text-sm text-gray-400 uppercase">
                    Question {key + 1}
                  </p>
                  <h3 className="font-semibold text-gray-100 text-md">
                    {item.question}
                  </h3>
                </div>
                <div
                  className={`w-12 h-12 grid place-items-center rounded-md ${
                    userAnswers[key].correct ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  {userAnswers[key].correct ? (
                    // <FaCheck className="text-2xl text-green-500" />
                    <FaCheck className="text-2xl text-green-700" />
                  ) : (
                    <FaTimes className="text-2xl text-red-700" />
                  )}
                </div>
              </div>
              <div className="grid items-center grid-cols-2 gap-2 mt-4">
                <div
                  className={`w-full rounded-md p-3 flex flex-col space-y-1 ${
                    userAnswers[key].correct ? "bg-green-900" : "bg-red-900"
                  }`}
                >
                  <span
                    className={`text-xs text-gray-200 ${
                      userAnswers[key].correct
                        ? "text-green-100"
                        : "text-red-100"
                    }`}
                  >
                    Your Answer
                  </span>
                  <span className="text-gray-100 text-md">
                    {userAnswers[key].answer}
                  </span>
                </div>
                <div className="flex flex-col w-full p-3 space-y-1 rounded-md bg-zinc-900">
                  <span className="text-xs text-gray-300">Correct Answer</span>
                  <span className="text-gray-100 text-md">
                    {item.options.map((ans) => {
                      return ans == item.correct ? ans : null;
                    })}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionResult;
