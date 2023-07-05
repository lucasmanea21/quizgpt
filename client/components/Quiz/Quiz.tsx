// components/Quiz.tsx
import { useState, useEffect } from "react";
import { useQuestions } from "../../hooks/useQuestions";
import { Question } from "./Question";
import { Timer } from "./Timer";
import { GameResults } from "./GameResults";
import { CardWrapper } from "../CardWrapper";
import { Answer } from "./Answer";
import { supabase } from "../../utils/supabaseClient";
import { useUser } from "@supabase/auth-helpers-react";
import { useAtom } from "jotai";
import { correctAnswerAtom, userAnswerAtom } from "../../store/atom";
import QuestionResult from "./QuestionsResult";

interface QuizProps {
  roomId: string;
  gameStartTime: any;
}

export const Quiz: React.FC<QuizProps> = ({ roomId }) => {
  const user = useUser();
  const questions = useQuestions(roomId);

  const [userAnswer, setUserAnswer] = useAtom(userAnswerAtom);
  const [correctAnswer, setCorrectAnswer] = useAtom(correctAnswerAtom);

  console.log("userAnswer", userAnswer);

  const [quizState, setQuizState] = useState("question");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [results, setResults] = useState([]);
  const [timePerQuestion, setTimePerQuestion] = useState(30);
  const [userAnswers, setUserAnswers] = useState<any[]>([]);

  useEffect(() => {
    const fetchRoomData = async () => {
      let { data: room, error } = await supabase
        .from("user_quizzes")
        .select("time_per_question")
        .eq("id", roomId);

      if (error) console.log("Error fetching room data: ", error);
      else setTimePerQuestion(room[0].time_per_question);
    };

    fetchRoomData();
  }, [roomId]);

  useEffect(() => {
    if (showAnswer) {
      const timer = setTimeout(() => {
        setShowAnswer(false);
        if (currentQuestion + 1 < questions.length) {
          setCurrentQuestion(currentQuestion + 1);
          setTimePerQuestion(timePerQuestion);
        } else {
          handleGameEnded();
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAnswer]);

  const handleGameEnded = async () => {
    const { data, error } = await supabase
      .from("rooms")
      .update({ isFinished: true })
      .eq("id", roomId);

    if (error) {
      console.error("Error ending game:", error);
    }

    setGameEnded(true);
  };

  // this function would be called when a player submits an answer
  const handleAnswer = async (playerId, isCorrect, answer) => {
    // update the player's results
    setResults((prevResults) => {
      const newResults = [...prevResults];
      const playerResult = newResults.find(
        (result) => result.user_id === playerId
      );
      if (playerResult) {
        playerResult.correctAnswers += isCorrect ? 1 : 0;
      } else {
        newResults.push({ playerId, correctAnswers: isCorrect ? 1 : 0 });
      }
      return newResults;
    });

    // Save the answer to the database
    const { data, error } = await supabase
      .from("responses")
      .insert([
        {
          user_id: playerId,
          room_id: roomId,
          step: currentQuestion + 1,
          answer: answer,
        },
      ])
      .select();

    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      {
        answer: answer,
        correct: isCorrect,
      },
    ]);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prevValue) => prevValue + 1);
    } else {
      handleGameEnded();
    }

    if (error) {
      console.error("Error saving answer:", error);
    }
  };

  console.log("questions", questions);
  if (gameEnded) {
    return <QuestionResult questions={questions} userAnswers={userAnswers} />;
  }

  if (showAnswer) {
    return <Answer questionStep={currentQuestion + 1} roomId={roomId} />;
  }

  return (
    <div className="w-2/3 bg-black rounded-md h-1/2">
      {questions.length > 0 && (
        <CardWrapper>
          <Question
            question={questions[currentQuestion]}
            showAnswer={showAnswer}
            questionIndex={currentQuestion + 1}
            onAnswer={(answer: string) =>
              handleAnswer(user.id, correctAnswer == userAnswer, answer)
            } // modify the Question component to accept this prop
          />
          {/* <Timer
            time={timePerQuestion * 1000}
            startTime={Date.now()}
            onTimeUp={() =>
              handleAnswer(user.id, correctAnswer == userAnswer, userAnswer)
            }
          /> */}
        </CardWrapper>
      )}
    </div>
  );
};
