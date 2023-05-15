// components/Room.tsx
import Link from "next/link";
import { useRoomUsers } from "../hooks/useRoomUsers";
import ShareRoomButton from "./ShareRoomButton";

export const Room = ({ roomId, setGameStarted }) => {
  const users = useRoomUsers(roomId);

  console.log("roomId", roomId);

  console.log("users", users);

  return (
    <div>
      <h1>Room {roomId}</h1>
      <h2>Users:</h2>
      {users.map((user) => (
        <div key={user.id}>
          <img src={user.avatar_url} alt={user.name} />{" "}
          {/* Adjust this based on your actual user image field */}
          <p>{user.full_name}</p>
          <Link href={`/profile/${user.id}`}>View Profile</Link>{" "}
          {/* Adjust this based on your actual profile page URL structure */}
        </div>
      ))}
      <ShareRoomButton roomId={roomId} />
      <button
        className="bg-blue-500 text   py-2 rounded"
        onClick={() => setGameStarted(true)}
      >
        Start Game
      </button>
    </div>
  );
};
