// hooks/useRoomUsers.tsx
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

export const useRoomUsers = (roomId) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!roomId) return;

    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from("users_rooms")
        .select(
          `user_id, profiles (
            id,
            username,
            avatar_url
            ) 
        )`
        )
        .eq("room_id", roomId);

      if (error) {
        console.error(error);
      } else {
        setUsers(data.map((item) => item["profiles"]));
      }
    };

    fetchUsers();
  }, [roomId]);

  return users;
};
