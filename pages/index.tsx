// pages/index.tsx
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/router";
import { useUser } from "@supabase/auth-helpers-react";
import { joinRoom } from "../utils/joinRoom";
import QuizCard from "../components/Community/Quizzes/Quiz";

const IndexPage: React.FC = () => {
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState("");
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    const { data, error } = await supabase.from("user_quizzes").select("*");
    if (error) {
      console.error("Error fetching rooms:", error);
    } else {
      setRooms(data || []);
    }
  };

  const createRoom = async () => {
    const { data, error } = await supabase
      .from("rooms")
      .insert({
        name: roomName,
        subject: "Sample Subject", // You can replace this with a form input for the subject
        owner_id: user.id, // Assuming the user is already logged in
        is_public: true, // Set this to false if you want the room to be private
        tags: selectedTags,
      })
      .select();
    if (error) {
      console.error("Error creating room:", error);
    } else {
      console.log("data", data);
      data && router.push(`/room/${data[0].id}`);
    }
  };

  const handleJoinRoom = async (roomId: number) => {
    try {
      await joinRoom(roomId, user.id); // assuming user.id is the ID of the current user
      router.push(`/room/${roomId}`);

      // Handle successful join (e.g. update UI)
    } catch (error) {
      // Handle error (e.g. show error message)
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-full px-6 py-8 text-white bg-black bg-opacity-90">
      <div className="w-3/4">
        <h1 className="mb-8 text-4xl font-bold">Quiz Rooms</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
          {/* Card for creating a quiz */}
          <div className="p-6 text-center border border-gray-200 rounded">
            <h2 className="mb-2 text-2xl font-bold">Create your quiz</h2>
            <p className="mb-4 text-gray-500">
              Start creating and sharing your own quizzes with the community.
            </p>
            <input
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              type="text"
              placeholder="Enter room name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
            <button
              className="w-full px-4 py-2 text-white bg-blue-500 rounded"
              onClick={createRoom}
            >
              Create Room
            </button>
          </div>
          {/* List of quiz cards */}
          {rooms.map((quiz) => (
            <QuizCard quiz={quiz} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
