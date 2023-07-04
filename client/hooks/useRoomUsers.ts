import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

const useRoomUsers = (roomId) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("users_rooms")
        .select("user_id, profiles (*)")
        .eq("room_id", roomId);

      if (error) console.error("Error fetching users:", error);
      else setUsers(data.map((d) => d.profiles));
    };

    fetchData();

    // Subscribe to changes
    const myChannel = supabase
      .channel("any")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "users_rooms" },
        (payload) => {
          fetchData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(myChannel);
    };
  }, [roomId]);

  return users;
};

export default useRoomUsers;
