// components/Question.tsx
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { correctAnswerAtom, userAnswerAtom } from "../../store/atom";

interface QuestionProps {
  question: any;
  showAnswer: boolean;
  onAnswer: (answer: string) => void;
  questionIndex: number;
}

export const Question: React.FC<QuestionProps> = ({
  question,
  showAnswer,
  onAnswer,
  questionIndex,
}) => {
  const [userAnswer, setUserAnswer] = useAtom(userAnswerAtom);
  const [correctAnswer, setCorrectAnswer] = useAtom(correctAnswerAtom);

  useEffect(() => {
    setCorrectAnswer(question.correct);
  }, [question]);

  const handleAnswerClick = (answer: string) => {
    onAnswer(answer);
  };

  return (
    <div>
      <h5>Question {questionIndex}</h5>
      <h2 className="mb-3 text-2xl font-bold">{question.question}</h2>
      <div className="flex flex-col justify-end">
        <div className="grid grid-cols-2 gap-2 my-5">
          {question.options.map((answer: string, index: number) => (
            <button
              key={index}
              className={`block w-full  p-4 rounded ${
                userAnswer === answer
                  ? "bg-blue-400 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
              disabled={showAnswer}
              onClick={() => setUserAnswer(answer)}
            >
              {answer}
            </button>
          ))}
        </div>
        <button
          className="w-20 h-10 text-white bg-blue-400 rounded-lg"
          onClick={() => handleAnswerClick(userAnswer)}
        >
          Next
        </button>
      </div>
    </div>
  );
};
