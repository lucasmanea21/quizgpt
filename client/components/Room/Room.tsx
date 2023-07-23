// components/Room.tsx
import Link from "next/link";
import useRoomUsers from "../../hooks/useRoomUsers";
import { FaUser, FaQuestion, FaClock, FaTag, FaLink } from "react-icons/fa";

import ShareRoomButton from "./ShareRoomSection";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import { useAtom } from "jotai";
import { gameStartTimeAtom } from "../../store/atom";
import { useUser } from "@supabase/auth-helpers-react";
import { useRooms } from "../../hooks/useRoom";
import { joinRoom } from "../../utils/joinRoom";
import ShareRoomSection from "./ShareRoomSection";
import { CreateRoomForm } from "./CreateRoomForm";
import InvitedToRoom from "./Invitation";

export const Room = ({ roomId, setGameStarted }) => {
  const room = useRooms(roomId); // Get the room data
  const users = useRoomUsers(roomId);
  const user = useUser();
  const [gameStartTime, setGameStartTime] = useAtom(gameStartTimeAtom);

  const [hasJoined, setHasJoined] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  console.log("users", users);

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
    setHasJoined(true); // set hasJoined to true once the room is joined
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
    <div className="flex justify-center w-full h-screen bg-zinc-900">
      {isLoggedIn ? (
        <div className="flex flex-col items-center w-full m-5 md:w-2/3 p-6 my-10 text-white rounded-md shadow-lg h-fit bg-zinc-950">
          <div className={`flex flex-col items-center justify-center`}>
            <h1 className="text-3xl font-bold">
              {room?.name || room?.subject || "Multiplayer Quiz"}
            </h1>
          </div>
          {/* <p className="text-sm text-gray-500">
          <FaTag className="inline-block mr-1" /> Tags: {room?.tags?.join(", ")}
        </p> */}
          <div className="flex items-center my-6 space-x-4">
            <div className="flex flex-row items-center">
              {/* <FaQuestion className="inline-block mr-2" /> */}
              <p>
                <span className="text-lg">{room?.questions_number || 15}</span>{" "}
                questions
              </p>
            </div>
            <div className="flex items-center">
              {/* <FaClock className="inline-block mr-2" /> */}
              {room?.time_per_question || 10} seconds per question
            </div>
          </div>

          {/* <h2 className="text-lg font-medium">Users:</h2> */}
          <div className="flex space-x-3 mt-5">
            {users.map((user, index) => {
              let { profile } = user;
              return (
                <Link href={`/profile/${profile.id}`} target="_blank">
                  <div
                    key={user.id}
                    className="flex items-center mb-2  flex-col justify-center"
                  >
                    <img
                      className="w-12 h-12 rounded-full"
                      src={profile.avatar_url}
                      alt={profile.name}
                      referrerPolicy="no-referrer"
                    />
                    <p className="mt-2">{profile.name}</p>
                    {/* <Link
                  href={`/profile/${profile.id}`}
                  className="text-blue-500 underline"
                >
                  View Profile
                </Link> */}
                  </div>
                </Link>
              );
            })}
          </div>
          {users.length === 0 && (
            <p className="mt-8 font-light text-gray-300">
              It's only you in here, for now.
            </p>
          )}
          <ShareRoomSection roomId={roomId} />

          <div className="space-x-2">
            {!hasJoined ? (
              <button
                className="px-4 py-2 text-white bg-blue-500 rounded"
                onClick={() => {
                  joinRoom(roomId, user.id);
                  setHasJoined(true);
                }}
              >
                Join Room
              </button>
            ) : (
              <button
                className="px-4 py-2 mt-10 text-white bg-green-500 rounded"
                onClick={startGame}
              >
                Start Game
              </button>
            )}
          </div>
        </div>
      ) : (
        <InvitedToRoom
          quizName={room?.name || room?.subject || "Multiplayer Quiz"}
          roomCreator={"Lucas Manea"}
          roomId={roomId}
        />
      )}
    </div>
  );
};
