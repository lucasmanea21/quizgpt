// pages/room/[roomId].tsx
import { useRouter } from "next/router";
import { useState } from "react";
import { Quiz } from "../../components/Quiz";
import { Room } from "../../components/Room";

const RoomPage: React.FC = () => {
  const router = useRouter();
  const { roomId } = router.query;
  const [gameStarted, setGameStarted] = useState(false);

  if (!roomId) {
    return (
      <div className="container mx-auto text-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!gameStarted) {
    return <Room roomId={roomId} setGameStarted={setGameStarted} />;
  }

  return (
    <div className="container mx-auto">
      <Quiz roomId={roomId as string} />
    </div>
  );
};

export default RoomPage;
