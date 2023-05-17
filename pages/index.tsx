// pages/index.tsx
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/router";
import { useUser } from "@supabase/auth-helpers-react";
import { joinRoom } from "../utils/joinRoom";

const IndexPage: React.FC = () => {
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState("");
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    const { data, error } = await supabase
      .from("rooms")
      .select("*")
      .eq("is_public", true);
    if (error) {
      console.error("Error fetching rooms:", error);
    } else {
      setRooms(data || []);
    }
  };

  console.log("supabase.auth", supabase.auth);

  const createRoom = async () => {
    const { data, error } = await supabase
      .from("rooms")
      .insert({
        name: roomName,
        subject: "Sample Subject", // You can replace this with a form input for the subject
        owner_id: user.id, // Assuming the user is already logged in
        is_public: true, // Set this to false if you want the room to be private
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
    <div className="container mx-auto">
      <h1 className="mb-4 text-3xl font-bold">Quiz Rooms</h1>
      <input
        className="p-2 mb-4 border border-gray-300 rounded"
        type="text"
        placeholder="Enter room name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <button
        className="px-4 py-2 text-white bg-blue-500 rounded"
        onClick={createRoom}
      >
        Create Room
      </button>
      <div className="mt-8 space-y-3">
        {rooms.map((room) => (
          <div className="flex flex-col items-center p-4 bg-gray-100 rounded-md shadow-lg">
            <h2 className="mb-2 text-2xl font-bold">{room.subject}</h2>
            <p className="mb-4 text-gray-500">{room.context}</p>
            <div className="flex items-center justify-between w-full">
              <button
                onClick={() => handleJoinRoom(room.id)}
                className="px-4 py-2 text-white bg-blue-500 rounded-md"
              >
                Join Room
              </button>
              <div className="flex items-center">
                {/* <span className="mr-2">{users.length}</span> */}
                <span className="mr-2">3</span>
                {/* <UserIcon className="w-6 h-6 text-gray-500" /> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndexPage;
