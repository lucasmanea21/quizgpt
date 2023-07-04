import React from "react";
import Link from "next/link";

const QuestionResult = ({ questions, userAnswers }: any) => {
  const percentile = userAnswers.filter((item: any) => item.correct).length;

  return (
    <div>
      <div className="w-full p-6 mb-4 rounded-lg bg-second-color">
        <div className="relative grid w-full overflow-hidden h-30 place-items-center">
          <span className="relative z-10 -top-2 text-9xl font-nabla">
            {Math.round((percentile / questions.length) * 100)}%
          </span>
          {/* <img
            className="absolute top-0 left-0 z-0 object-cover w-full h-full opacity-60"
            src={Image}
            alt="result"
          /> */}
        </div>
        <p className="my-4 text-sm font-medium text-center text-text-color">
          You answered {percentile} out of {questions.length} questions
          correctly!
        </p>
        <Link
          href="/"
          className="block w-full px-6 py-5 text-sm text-center border-none rounded-full outline-none cursor-pointer text-text-color bg-opacity-second"
        >
          Start a new quiz!
        </Link>
      </div>

      <div className="flex flex-col space-y-3">
        <h1>Check correct answers</h1>
        {questions.map((item, key) => {
          console.log();
          return (
            <div
              key={key}
              className={`p-5 rounded-xl bg-white ${
                userAnswers[key].correct
                  ? "border-l-4 border-green-400"
                  : "border-l-4 border-red-500"
              }`}
            >
              <div className="grid items-center grid-cols-2 gap-4">
                <div>
                  <p className="mb-2 text-xs tracking-widest text-blue-500 uppercase">
                    Question: {key + 1}
                  </p>
                  <h3 className="text-sm font-semibold text-gray-800">
                    {item.question}
                  </h3>
                </div>
                <div
                  className={`w-12 h-12 grid place-items-center rounded-md ${
                    userAnswers[key].correct ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  <i
                    className={`text-2xl ${
                      userAnswers[key].correct
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  ></i>
                </div>
              </div>
              <div className="grid items-center grid-cols-2 gap-2 mt-4">
                <div
                  className={`w-full rounded-md p-3 flex flex-col space-y-1 ${
                    userAnswers[key].correct ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  <span
                    className={`text-xs text-gray-500 ${
                      userAnswers[key].correct
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    Your Answer
                  </span>
                  <span className="text-sm text-gray-800">
                    {userAnswers[key].answer}
                  </span>
                </div>
                <div className="flex flex-col w-full p-3 space-y-1 bg-gray-200 rounded-md">
                  <span className="text-xs text-gray-500">Correct Answer</span>
                  <span className="text-sm text-gray-800">
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
