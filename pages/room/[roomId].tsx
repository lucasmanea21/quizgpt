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
  const { roomId } = router.query;

  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameStartTime, setGameStartTime] = useState(0);

  console.log("gameStartTime", gameStartTime);

  if (!roomId) {
    return (
      <div className="container mx-auto text-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (gameOver) {
    return <QuizOver />;
  }

  if (!gameStarted) {
    return <Room roomId={roomId} setGameStarted={setGameStarted} />;
  }

  return (
    <div className="container mx-auto">
      <Quiz roomId={roomId as string} gameStartTime={gameStartTime} />
    </div>
  );
};

export default RoomPage;
