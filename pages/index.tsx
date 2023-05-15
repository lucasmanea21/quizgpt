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
      <h1 className="text-3xl font-bold mb-4">Quiz Rooms</h1>
      <input
        className="border border-gray-300 rounded p-2 mb-4"
        type="text"
        placeholder="Enter room name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={createRoom}
      >
        Create Room
      </button>
      <div className="mt-8">
        {rooms.map((room) => (
          <div key={room.id} className="border border-gray-300 p-4 mb-4">
            <h2 className="text-xl font-bold">{room.name}</h2>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => handleJoinRoom(room.id)}
            >
              Join Room
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndexPage;
