import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";

export const useRooms = (roomId) => {
  const [rooms, setRooms] = useState<any>([]);

  useEffect(() => {
    if (!roomId) {
      return;
    }

    const fetchRooms = async () => {
      const { data, error } = await supabase
        .from("rooms")
        .select()
        .eq("id", roomId);

      console.log("data", data);

      if (error) {
        console.error("Error fetching rooms:", error);
      } else {
        data && setRooms(data[0]);
      }
    };

    fetchRooms();
  }, [roomId]);

  return rooms;
};
