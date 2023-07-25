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
import { fetchProfileData } from "../../utils";
import { toast } from "react-toastify";

export const Room = ({
  initialRoomId,
  quizId,
  setGameStarted,
  room,
  isMultiplayer,
}) => {
  const user = useUser();

  // const [{ data, error, fetching }, reexecute] = useRealtime("users_rooms");
  // const [users, setUsers] = useState([]);

  // console.log("room data", data);

  const [gameStartTime, setGameStartTime] = useAtom(gameStartTimeAtom);

  const [hasJoined, setHasJoined] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [roomId, setRoomId] = useState(initialRoomId);
  const [users, setUsers] = useState([]);

  // console.log("users", users);

  useEffect(() => {
    setRoomId(initialRoomId);
  }, [initialRoomId]);

  console.log("users, roomId", users, roomId);

  useEffect(() => {
    console.log("ran the good useEffect");
    if (!roomId) {
      setUsers([]);
      return;
    }
    const usersChannel = supabase
      .channel("any")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "users_rooms" },
        async (payload) => {
          console.log("payload", payload);
          const { old, new: newUser } = payload;
          if (payload.eventType === "INSERT") {
            const userProfile = await fetchProfileData(newUser.user_id);
            setUsers((prevUsers) => [
              ...prevUsers,
              { ...newUser, profile: userProfile },
            ]);
            toast.info(`${userProfile.name || "A user"} has joined the room!`);
          } else if (payload.eventType === "DELETE") {
            const userProfile = await fetchProfileData(old.user_id);
            setUsers((prevUsers) =>
              prevUsers.filter((user) => user.user_id !== old.user_id)
            );
            toast.info(`${userProfile.name || "A user"} has left the room!`);
          } else {
            fetchData();
          }
        }
      )
      .subscribe();

    const fetchData = async () => {
      console.log("ran fetch");
      const { data, error } = await supabase
        .from("users_rooms")
        .select("*")
        .eq("room_id", roomId);

      if (error) {
        console.error("Error fetching users:", error);
      } else {
        const userIds = data.map((user) => user.user_id);

        const profiles = await Promise.all(
          userIds.map(async (userId) => await fetchProfileData(userId))
        );

        const usersWithProfiles = data.map((user, index) => {
          return profiles[index] ? { ...user, profile: profiles[index] } : null;
        });

        setUsers(usersWithProfiles.filter((user) => user !== null));
      }
    };

    fetchData();

    // const myChannel = supabase
    //   .channel("any")
    //   .on(
    //     "postgres_changes",
    //     { event: "*", schema: "public", table: "users_rooms" },
    //     async (payload) => {
    //       console.log("payload", payload);

    //       if (payload.event === "INSERT") {
    //         const newUser = payload.new;
    //         const userProfile = await fetchProfileData(newUser.user_id);
    //         setUsers((prevUsers) => [
    //           ...prevUsers,
    //           { ...newUser, profile: userProfile },
    //         ]);
    //         toast.info("A new user has joined the room!");
    //       } else {
    //         fetchData();
    //       }
    //     }
    //   )
    //   .subscribe();

    return () => {
      supabase.removeChannel(usersChannel);
    };
  }, [roomId]);

  useEffect(() => {
    const handleRoomUpdate = (payload) => {
      const { new: room } = payload;

      if (room.isStarted) {
        setGameStarted(true);
        setGameStartTime(Date.parse(room.game_start_time));
      }
    };

    const handleUsersUpdate = (payload) => {
      const { new: users } = payload;

      setRoomId((prevRoomId) => prevRoomId);

      console.log("users", users);
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

    // const usersChannel = supabase
    //   .channel("any")
    //   .on(
    //     "postgres_changes",
    //     { event: "UPDATE", schema: "public", table: "users_rooms" },
    //     (payload) => {
    //       console.log("Change received!", payload);
    //       handleUsersUpdate(payload);
    //     }
    //   )
    //   .subscribe();

    return () => {
      // supabase.removeChannel(channel);
      // supabase.removeChannel(usersChannel);
    };
  }, [roomId, setGameStarted, setGameStartTime, setRoomId]);

  useEffect(() => {
    // TODO: only do this once, using useState
    joinRoom(roomId, user?.id);
    setHasJoined(true); // set hasJoined to true once the room is joined
  }, []);

  const startGame = async () => {
    if (isMultiplayer) {
      const { error } = await supabase
        .from("rooms")
        .update({ is_started: true, game_start_time: new Date() })
        .eq("id", roomId);

      if (error) {
        console.error("Error starting game:", error);
        return;
      }
    }

    setGameStarted(true);
  };

  console.log("room", room);

  return (
    <div className="flex justify-center w-full">
      {isLoggedIn ? (
        <div className="flex flex-col items-center w-full p-8 text-white rounded-md shadow-lg max-w-[700px] h-fit bg-zinc-950">
          <div className={`flex flex-col items-center justify-center`}>
            <h1 className="text-3xl font-bold">
              {isMultiplayer
                ? room?.name || room?.subject || "Multiplayer Quiz"
                : "Solo Quiz"}
            </h1>
          </div>
          {/* <p className="text-sm text-gray-500">
          <FaTag className="inline-block mr-1" /> Tags: {room?.tags?.join(", ")}
        </p> */}
          <div className="flex items-center my-6 space-x-4">
            <div className="flex flex-row items-center">
              {/* <FaQuestion className="inline-block mr-2" /> */}
              <p>
                <span className="text-lg">{room?.questions_number || 7}</span>{" "}
                questions
              </p>
            </div>
            <div className="flex items-center">
              {/* <FaClock className="inline-block mr-2" /> */}
              {room?.time_per_question || 10} seconds per question
            </div>
          </div>

          {/* <h2 className="text-lg font-medium">Users:</h2> */}
          <div className="flex mt-5 space-x-3">
            {users &&
              users?.map((user, index) => {
                let { profile } = user;
                return (
                  <Link href={`/profile/${profile.id}`} target="_blank">
                    <div
                      key={user.id}
                      className="flex flex-col items-center justify-center mb-2"
                    >
                      <img
                        className="w-12 h-12 rounded-full"
                        src={profile.avatar_url}
                        alt={profile.name}
                        referrerPolicy="no-referrer"
                      />
                      <p className="mt-2">{profile.name}</p>
                      <Link
                        href={`/profile/${profile.id}`}
                        className="text-blue-500 underline"
                      >
                        View Profile
                      </Link>
                    </div>
                  </Link>
                );
              })}
          </div>
          {isMultiplayer && (
            <>
              {/* {Array.isArray(users) && (
                <p className="mt-8 font-light text-gray-300">
                  It's only you in here, for now.
                </p>
              )} */}
              <ShareRoomSection roomId={roomId} />
            </>
          )}

          <div className="space-x-2">
            {!hasJoined ? (
              <button
                className="px-4 py-2 text-white bg-blue-500 rounded"
                onClick={() => {
                  joinRoom(roomId, user?.id);
                  setHasJoined(true);
                }}
              >
                Join Room
              </button>
            ) : (
              <button
                className="px-4 py-2 mt-10 text-white bg-blue-500 rounded"
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
