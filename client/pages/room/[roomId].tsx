import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { Quiz } from "../../components/Quiz/Quiz";
import { Room } from "../../components/Room/Room";
import { useRooms } from "../../hooks/useRoom";
import { joinRoom } from "../../utils/joinRoom";
import { useUser } from "@supabase/auth-helpers-react";

const RoomPage: React.FC = () => {
  const router = useRouter();
  const roomId = router.query?.roomId;
  const user = useUser();

  const room = useRooms(roomId);

  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameStartTime, setGameStartTime] = useState(0);

  const handleJoinRoom = async (roomId: number) => {
    try {
      await joinRoom(roomId, user?.id); // assuming user.id is the ID of the current user
      //   router.push(`/room/${roomId}`);

      // Handle successful join (e.g. update UI)
    } catch (error) {
      // Handle error (e.g. show error message)
    }
  };

  useEffect(() => {
    roomId && handleJoinRoom(Number(roomId));
  }, [roomId]);

  if (!roomId && !room) {
    return (
      <div className="container mx-auto text-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full h-screen p-10 m-0 mx-auto bg-black h-min-screen bg-opacity-95">
      {gameOver ? (
        <div className="flex flex-col items-center justify-center space-y-4">
          <h2 className="text-2xl">The quiz is over</h2>
          <Link href="/quizzes" className="text-blue-500 underline">
            Back to Quizzes
          </Link>
        </div>
      ) : !gameStarted ? (
        <Room
          quizId={room?.quiz}
          roomId={room?.id}
          room={room}
          setGameStarted={setGameStarted}
        />
      ) : (
        <Quiz
          isMultiplayer={true}
          roomId={room?.quiz}
          gameStartTime={gameStartTime}
        />
      )}
    </div>
  );
};

export default RoomPage;
