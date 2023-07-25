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
  quizId: string;
  gameStartTime: any;
  isMultiplayer: boolean;
  room: any;
}

export const Quiz: React.FC<QuizProps> = ({
  roomId,
  isMultiplayer,
  quizId,
  room,
}) => {
  const user = useUser();
  const questions = useQuestions(quizId);

  const [userAnswer, setUserAnswer] = useAtom(userAnswerAtom);
  const [correctAnswer, setCorrectAnswer] = useAtom(correctAnswerAtom);

  const [quizState, setQuizState] = useState("question");
  const [currentQuestion, setCurrentQuestion] = useState(
    isMultiplayer ? room?.step - 1 ?? 0 : 0
  );
  const [showAnswer, setShowAnswer] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [results, setResults] = useState([]);
  const [timePerQuestion, setTimePerQuestion] = useState(30);
  const [userAnswers, setUserAnswers] = useState<any[]>([]);

  // useEffect(() => {
  //   const fetchRoomData = async () => {
  //     let { data: room, error } = await supabase
  //       .from("user_quizzes")
  //       .select("time_per_question")
  //       .eq("id", roomId);

  //     if (error) console.log("Error fetching room data: ", error);
  //     else setTimePerQuestion(room[0].time_per_question);
  //   };

  //   fetchRoomData();
  // }, [roomId]);

  // useEffect(() => {
  //   if (showAnswer) {
  //     const timer = setTimeout(() => {
  //       setShowAnswer(false);
  //       if (currentQuestion + 1 < questions.length) {
  //         setCurrentQuestion(currentQuestion + 1);
  //         setTimePerQuestion(timePerQuestion);
  //       } else {
  //         handleGameEnded();
  //       }
  //     }, 3000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [showAnswer]);

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
    setUserAnswer("");

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

    console.log({
      user_id: playerId,
      room_id: roomId,
      step: currentQuestion + 1,
      answer: answer,
    });
    // Save the answer to the database
    const { data, error } = await supabase
      .from("responses")
      .insert([
        {
          user_id: playerId,
          quiz_id: quizId,
          room_id: roomId,
          step: currentQuestion + 1,
          answer: answer,
        },
      ])
      .select();

    isMultiplayer && setShowAnswer(true);

    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      {
        answer: answer,
        correct: isCorrect,
      },
    ]);

    if (currentQuestion + 1 < questions.length) {
      !isMultiplayer && setCurrentQuestion((prevValue) => prevValue + 1);
    } else {
      handleGameEnded();
    }

    if (error) {
      console.error("Error saving answer:", error);
    }
  };

  const handleNextQuestion = async () => {
    const { data, error } = await supabase
      .from("rooms")
      .update({ step: currentQuestion + 1 })
      .eq("id", roomId);

    if (error) {
      console.error("Error ending game:", error);
    }

    setCurrentQuestion((prevValue) => prevValue + 1);
  };

  console.log("questions", questions);

  return (
    <div className="w-full px-5 py-5 rounded-md md:px-10 h-fit max-w-[850px]">
      {showAnswer && isMultiplayer ? (
        <Answer
          question={questions[currentQuestion]}
          questionIndex={currentQuestion + 1}
          roomId={roomId}
          quizId={quizId}
          handleNextQuestion={handleNextQuestion}
          setShowAnswer={setShowAnswer}
        />
      ) : gameEnded ? (
        <QuestionResult questions={questions} userAnswers={userAnswers} />
      ) : questions.length > 0 ? (
        <div className="w-full">
          <Question
            question={questions[currentQuestion]}
            showAnswer={showAnswer}
            questionIndex={currentQuestion + 1}
            onAnswer={(answer: string) => {
              handleAnswer(user?.id, correctAnswer == userAnswer, answer);
            }} // modify the Question component to accept this prop
            timePerQuestion={timePerQuestion}
          />
        </div>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
};
