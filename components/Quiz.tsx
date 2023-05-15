// components/Quiz.tsx
import { useState, useEffect } from "react";
import { useQuestions } from "../hooks/useQuestions";
import { Question } from "./Question";
import { Timer } from "./Timer";
import { GameResults } from "./GameResults";
import { CardWrapper } from "./CardWrapper";

interface QuizProps {
  roomId: string;
}

export const Quiz: React.FC<QuizProps> = ({ roomId }) => {
  const questions = useQuestions(roomId);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (showAnswer) {
      const timer = setTimeout(() => {
        setShowAnswer(false);
        if (currentQuestion + 1 < questions.length) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          setGameEnded(true);
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAnswer]);

  // this function would be called when a player submits an answer
  const handleAnswer = (playerId, isCorrect) => {
    setShowAnswer(true);
    // update the player's results
    setResults((prevResults) => {
      const newResults = [...prevResults];
      const playerResult = newResults.find(
        (result) => result.playerId === playerId
      );
      if (playerResult) {
        playerResult.correctAnswers += isCorrect ? 1 : 0;
      } else {
        newResults.push({ playerId, correctAnswers: isCorrect ? 1 : 0 });
      }
      return newResults;
    });
  };

  if (gameEnded) {
    return <GameResults results={results} gameSummary="The game has ended." />;
  }

  return (
    <div>
      {questions.length > 0 && (
        <CardWrapper>
          <Question
            question={questions[currentQuestion]}
            showAnswer={showAnswer}
            onAnswer={handleAnswer} // modify the Question component to accept this prop
          />
          <Timer onTimeUp={() => handleAnswer(null, false)} />
        </CardWrapper>
      )}
    </div>
  );
};
