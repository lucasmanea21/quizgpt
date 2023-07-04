import React from "react";
import { BiUserCircle } from "react-icons/bi";
import { FaPlay } from "react-icons/fa";
import Link from "next/link";

const QuizCard = ({ quiz }) => {
  return (
    <div className="flex flex-col w-full p-6 mx-auto text-white bg-black bg-opacity-50 shadow-lg rounded-xl">
      <h2 className="mb-2 text-2xl font-bold text-gray-200">{quiz.title}</h2>
      <h4 className="mb-4 text-sm text-gray-300">{quiz.description}</h4>
      <div className="mb-4">
        <span className="inline-block px-3 py-1 text-xs text-blue-800 bg-blue-200 rounded-full">
          {quiz.number_of_questions} Questions
        </span>
        <span className="inline-block px-3 py-1 ml-2 text-xs text-green-800 bg-green-200 rounded-full">
          {quiz.difficulty}
        </span>
      </div>
      <div className="flex items-center justify-between mt-auto">
        <Link
          href={`/user/${quiz.creatorId}`}
          className="flex items-center hover:text-blue-500"
        >
          <BiUserCircle className="mr-2 text-gray-500" />
          <span className="text-sm text-gray-500">{quiz.creator}</span>
        </Link>
        <Link
          href={`/quiz/${quiz.id}`}
          className="flex items-center hover:text-blue-500"
        >
          <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
            Play
            {/* <FaPlay className="ml-2" /> */}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default QuizCard;
