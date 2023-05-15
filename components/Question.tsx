// components/Question.tsx
import { useState } from "react";

interface QuestionProps {
  question: any;
  showAnswer: boolean;
  onAnswer: () => void;
}

export const Question: React.FC<QuestionProps> = ({
  question,
  showAnswer,
  onAnswer,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
    onAnswer();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{question.question}</h2>
      {question.answers.map((answer: string, index: number) => (
        <button
          key={index}
          className={`block w-full mb-4 p-4 rounded ${
            showAnswer
              ? answer === question.correct
                ? "bg-green-500"
                : selectedAnswer === answer
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
