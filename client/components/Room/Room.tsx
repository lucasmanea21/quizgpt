// components/Room.tsx
import Link from "next/link";
import useRoomUsers from "../../hooks/useRoomUsers";
import ShareRoomButton from "./ShareRoomButton";
import { useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import { useAtom } from "jotai";
import { gameStartTimeAtom } from "../../store/atom";
import { useUser } from "@supabase/auth-helpers-react";
import { useRooms } from "../../hooks/useRoom";
import { joinRoom } from "../../utils/joinRoom";

export const Room = ({ roomId, setGameStarted }) => {
  const room = useRooms(roomId); // Get the room data
  const users = useRoomUsers(roomId);
  const user = useUser();
  const [gameStartTime, setGameStartTime] = useAtom(gameStartTimeAtom);
  console.log("user", user);

  useEffect(() => {
    const handleRoomUpdate = (payload) => {
      const { new: room } = payload;
      console.log("room.game_start_time", room.game_start_time);
      if (room.isStarted) {
        setGameStarted(true);
        setGameStartTime(Date.parse(room.game_start_time));
      }
    };

    const channel = supabase
      .channel("any")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "rooms" },
        (payload) => {
          console.log("Change received!", payload);
          handleRoomUpdate(payload);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId, setGameStarted, setGameStartTime]);

  useEffect(() => {
    // TODO: only do this once, using useState
    joinRoom(roomId, user.id);
  }, []);

  const startGame = async () => {
    const { error } = await supabase
      .from("rooms")
      .update({ is_started: true, game_start_time: new Date() })
      .eq("id", roomId);

    if (error) {
      console.error("Error starting game:", error);
      return;
    }

    setGameStarted(true);
  };

  console.log("room", room);

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 rounded-md shadow-lg">
      <h1 className="mb-2 text-2xl font-bold">{room?.name}</h1>
      <p className="mb-2 text-lg font-medium">{room?.subject}</p>
      <p className="mb-4 text-sm text-gray-500">
        Tags: {room?.tags?.join(", ")}
      </p>
      <div className="mb-2">
        <span className="font-medium">Number of Questions: </span>
        <span>{room?.questions_number}</span>
      </div>
      <div className="mb-4">
        <span className="font-medium">Time per Question: </span>
        <span>{room?.time_per_question} seconds</span>
      </div>

      <h2 className="mb-2 text-lg font-medium">Users:</h2>
      {users.map((user) => {
        return (
          <div key={user.id} className="flex items-center mb-2 space-x-4">
            <img
              className="w-12 h-12 rounded-full"
              src={user.avatar_url}
              alt={user.name}
              referrerPolicy="no-referrer"
            />
            <p className="font-medium">{user.full_name}</p>
            <Link
              href={`/profile/${user.id}`}
              className="text-blue-500 underline"
            >
              View Profile
            </Link>
          </div>
        );
      })}
      <ShareRoomButton roomId={roomId} />
      <div className="mt-4 space-x-2">
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded"
          onClick={joinRoom}
        >
          Join Room
        </button>
        <button
          className="px-4 py-2 text-white bg-green-500 rounded"
          onClick={startGame}
        >
          Start Game
        </button>
      </div>
    </div>
  );
};
