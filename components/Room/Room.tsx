// components/Room.tsx
import Link from "next/link";
import useRoomUsers from "../../hooks/useRoomUsers";
import ShareRoomButton from "./ShareRoomButton";
import { useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import { useAtom } from "jotai";
import { gameStartTimeAtom } from "../../store/atom";

export const Room = ({ roomId, setGameStarted }) => {
  const users = useRoomUsers(roomId);
  const [gameStartTime, setGameStartTime] = useAtom(gameStartTimeAtom);

  console.log("supabase", supabase);

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

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 rounded-md shadow-lg">
      <h1 className="mb-4 text-2xl font-bold">Room {roomId}</h1>
      <h2 className="mb-2 text-lg font-medium">Users:</h2>
      {users.map((user) => {
        console.log("user", user);
        return (
          <div key={user.id} className="flex items-center mb-2 space-x-4">
            <img
              className="w-12 h-12 rounded-full"
              src={user.avatar_url}
              alt={user.name}
              referrerPolicy="no-referrer"
            />{" "}
            {/* Adjust this based on your actual user image field */}
            <p className="font-medium">{user.full_name}</p>
            <Link
              href={`/profile/${user.id}`}
              className="text-blue-500 underline"
            >
              View Profile
            </Link>{" "}
            {/* Adjust this based on your actual profile page URL structure */}
          </div>
        );
      })}
      <ShareRoomButton roomId={roomId} />
      <button
        className="px-4 py-2 text-white bg-blue-500 rounded"
        onClick={() => startGame()}
      >
        Start Game
      </button>
    </div>
  );
};
