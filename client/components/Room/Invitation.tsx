import React, { useState } from "react"; // Import useState
import Link from "next/link";
import { useRooms } from "../../hooks/useRoom";
import { FaDoorOpen, FaUserCircle } from "react-icons/fa";
import useRoomUsers from "../../hooks/useRoomUsers";
import { useRouter } from "next/router";
import { useUser } from "@supabase/auth-helpers-react";

import GuestUserComponent from "./GuestUserComponent";

const InvitedToRoom = ({ quizName, roomCreator, roomId }) => {
  const router = useRouter();
  const currentPath = router.asPath;
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const room = useRooms(roomId); // Get the room data
  const users = useRoomUsers(roomId);

  // Set up state to track whether the user clicked to play as a guest
  const [playAsGuest, setPlayAsGuest] = useState(false);
  const [showGuestUser, setShowGuestUser] = useState(false);

  return (
    <div className="flex justify-center w-full h-screen bg-zinc-900">
      <div className="flex flex-col items-center w-full p-10 m-5 my-10 text-white rounded-md shadow-lg md:p-20 md:w-2/3 h-fit bg-zinc-950">
        <>
          <h1 className="text-3xl font-bold text-center">
            {roomCreator
              ? `${roomCreator} has invited you to play ${quizName}!`
              : `You've been invited to play ${quizName}!`}
          </h1>
          <h2 className="mt-10 text-lg font-medium md:mt-5">Room Details:</h2>

          <p className="mb-5 text-center">
            Questions: {room?.questions_number || 15}, Time per question:{" "}
            {room?.time_per_question || 10} seconds
          </p>

          {/* Display users in the room */}
          {/* <h2 className="mt-5 text-lg font-medium">Users in the Room:</h2> */}
          {users.map((user) => (
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
          ))}
          {users.length === 0 && (
            <p className="mb-10 font-light text-gray-300 ">
              No users in the room yet.
            </p>
          )}

          <div className="flex flex-col justify-center w-full md:w-2/3 md:space-x-2 md:flex-row">
            {showGuestUser ? ( // Conditional rendering based on playAsGuest state
              <GuestUserComponent />
            ) : (
              <>
                <Link href={`/auth?redirectTo=${currentUrl}`}>
                  <p className="flex items-center justify-center w-full px-4 py-2 mb-2 text-lg text-white bg-blue-500 rounded md:text-md">
                    <FaDoorOpen className="mr-3" /> Log in
                  </p>
                </Link>

                {/* When the user clicks to play as a guest, setPlayAsGuest will be called */}
                <p
                  onClick={() => setShowGuestUser(true)}
                  className="flex items-center justify-center w-full px-4 py-2 text-lg text-white bg-gray-700 rounded cursor-pointer md:text-md"
                >
                  <FaUserCircle className="mr-3" /> Play as guest
                </p>
              </>
            )}
          </div>
        </>
      </div>
    </div>
  );
};

export default InvitedToRoom;
