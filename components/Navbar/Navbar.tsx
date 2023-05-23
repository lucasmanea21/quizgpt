import React from "react";
import {
  FaHome,
  FaUser,
  FaGamepad,
  FaPlus,
  FaDoorOpen,
  FaTrophy,
} from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";

const Navbar = () => {
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

  return (
    <nav className="absolute sticky top-0 flex items-center justify-between w-full p-6 mb-10 text-white bg-black bg-opacity-70 ">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold">QuizApp</h1>
        {!isMobile && (
          <>
            <Link href="/" className="ml-8 active:underline">
              <FaHome className="inline-block mr-2" /> Home
            </Link>
            <Link href="/join" className="ml-8 active:underline">
              <FaPlus className="inline-block mr-2" /> Join Room
            </Link>
            <Link href="/room/create" className="ml-8 active:underline">
              <FaPlus className="inline-block mr-2" /> Create Room
            </Link>
            <Link href="/leaderboard" className="ml-8 active:underline">
              <FaTrophy className="inline-block mr-2" /> Leaderboard
            </Link>
          </>
        )}
      </div>
      <div className="flex items-center">
        <Link href="/profile">
          <FaUser className="inline-block mr-2" /> Profile
        </Link>
        <button className="ml-8 active:underline">
          <FaDoorOpen className="inline-block mr-2" /> Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
