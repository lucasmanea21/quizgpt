import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { Quiz } from "../../components/Quiz/Quiz";
import { Room } from "../../components/Room/Room";

export const QuizOver = () => (
  <div className="flex flex-col items-center justify-center space-y-4">
    <h2 className="text-2xl">The quiz is over</h2>
    <Link href="/quizzes" className="text-blue-500 underline">
      Back to Quizzes
    </Link>
  </div>
);

const RoomPage: React.FC = () => {
  const router = useRouter();
  const { quizId } = router.query;
  console.log("router.query", router.query);

  console.log("roomId", quizId);

  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameStartTime, setGameStartTime] = useState(0);

  console.log("gameStartTime", gameStartTime);

  return (
    <div className="flex justify-center w-full min-h-screen p-5 m-0 mx-auto bg-black md:p-10 bg-opacity-95">
      {!quizId ? (
        <div className="container mx-auto text-center">
          <p>Loading...</p>
        </div>
      ) : gameOver ? (
        <QuizOver />
      ) : !gameStarted ? (
        <Room
          roomId={quizId}
          setGameStarted={setGameStarted}
          isMultiplayer={false}
        />
      ) : (
        <Quiz
          isMultiplayer={false}
          roomId={quizId as string}
          quizId={quizId as string}
          gameStartTime={gameStartTime}
        />
      )}
    </div>
  );
};

export default RoomPage;
