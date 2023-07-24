// components/Question.tsx
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { correctAnswerAtom, userAnswerAtom } from "../../store/atom";
import { Timer } from "./Timer";

interface QuestionProps {
  question: any;
  showAnswer: boolean;
  onAnswer: (answer: string) => void;
  questionIndex: number;
  timePerQuestion: number;
}

export const Question: React.FC<QuestionProps> = ({
  question,
  showAnswer,
  onAnswer,
  questionIndex,
  timePerQuestion,
}) => {
  const [userAnswer, setUserAnswer] = useAtom(userAnswerAtom);
  const [correctAnswer, setCorrectAnswer] = useAtom(correctAnswerAtom);
  const [answerSelected, setAnswerSelected] = useState(false);

  useEffect(() => {
    setCorrectAnswer(question.correct);
  }, [question]);

  const handleAnswerClick = (answer: string) => {
    setAnswerSelected(false);

    onAnswer(answer);
  };

  console.log("userAnswer", userAnswer);

  return (
    <div className="p-4 text-white rounded-md bg-zinc-950 md:p-8">
      <h5 className="text-lg md:text-xl">Question {questionIndex}</h5>
      <h2 className="mb-3 text-xl font-bold md:text-2xl">
        {question.question}
      </h2>
      <div className="flex flex-col justify-end">
        <div className="grid grid-cols-1 gap-2 my-5 md:grid-cols-2">
          {question.options.map((answer: string, index: number) => (
            <button
              key={index}
              className={`block w-full py-2 md:p-4 rounded ${
                userAnswer === answer
                  ? "bg-blue-500 text-white"
                  : "bg-zinc-900 text-gray-100"
              }`}
              disabled={showAnswer}
              onClick={() => {
                setAnswerSelected(true);
                setUserAnswer(answer);
              }}
            >
              {answer}
            </button>
          ))}
        </div>
        <div className="relative flex w-full">
          <button
            className={`w-20 h-10 text-white ${
              answerSelected ? "bg-blue-500" : "bg-blue-400"
            } rounded-lg`}
            disabled={!answerSelected}
            onClick={() => handleAnswerClick(userAnswer)}
          >
            Next
          </button>

          {/* <div className="w-[50px] absolute right-0">
            <Timer
              time={timePerQuestion * 1000}
              startTime={Date.now()}
              onTimeUp={() => handleAnswerClick(userAnswer)}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};
