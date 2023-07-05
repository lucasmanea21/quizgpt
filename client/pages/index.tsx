// pages/index.tsx
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/router";
import { useUser } from "@supabase/auth-helpers-react";
import { joinRoom } from "../utils/joinRoom";
import QuizCard from "../components/Community/Quizzes/Quiz";
import ComingSoon from "../components/ComingSoon";

const IndexPage: React.FC = () => {
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [isStarted, setIsStarted] = useState(true);
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

  return isStarted ? (
    <div className="flex items-center justify-center w-full h-full px-6 py-8 text-white bg-black bg-opacity-90">
      <div className="w-3/4">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold ">Quiz rooms</h1>
          <p className="text-gray-300 text-md">
            Explore & play quizzes crafted & reviewed by the community.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
          {/* Card for creating a quiz */}
          <div className="flex flex-col justify-between w-full p-6 mx-auto text-white bg-black bg-opacity-50 shadow-lg rounded-xl">
            <div className="">
              <h2 className="mb-2 text-2xl font-bold text-gray-200">
                Create your quiz
              </h2>
              <p className="mb-4 text-sm text-gray-300">
                Start creating and sharing your own AI quizzes with the
                community.
              </p>
            </div>
            <button
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
              onClick={createRoom}
            >
              Create Quiz
            </button>
          </div>
          {/* List of quiz cards */}
          {rooms.map((quiz) => (
            <QuizCard quiz={quiz} />
          ))}
        </div>
      </div>
    </div>
  ) : (
    <ComingSoon />
  );
};

export default IndexPage;
