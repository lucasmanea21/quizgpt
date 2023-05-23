// components/Question.tsx
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { correctAnswerAtom, userAnswerAtom } from "../../store/atom";

interface QuestionProps {
  question: any;
  showAnswer: boolean;
  onAnswer: (answer: string) => void;
}

export const Question: React.FC<QuestionProps> = ({
  question,
  showAnswer,
  onAnswer,
}) => {
  const [userAnswer, setUserAnswer] = useAtom(userAnswerAtom);
  const [correctAnswer, setCorrectAnswer] = useAtom(correctAnswerAtom);

  useEffect(() => {
    setCorrectAnswer(question.correct);
  }, [question]);

  const handleAnswerClick = (answer: string) => {
    setUserAnswer(answer);
    onAnswer(answer);
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">{question.question}</h2>
      {question.options.map((answer: string, index: number) => (
        <button
          key={index}
          className={`block w-full mb-4 p-4 rounded ${
            showAnswer
              ? answer === question.correct
                ? "bg-green-500"
                : userAnswer === answer
                ? "bg-red-500"
                : "bg-gray-200"
              : "bg-gray-200"
          }`}
          onClick={() => handleAnswerClick(answer)}
          disabled={showAnswer}
        >
          {answer}
        </button>
      ))}
    </div>
  );
};
