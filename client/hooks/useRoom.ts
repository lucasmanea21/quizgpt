import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";

export const useRooms = (roomId) => {
  const [rooms, setRooms] = useState<any>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const { data, error } = await supabase
        .from("rooms")
        .select()
        .eq("id", roomId);

      if (error) {
        console.error("Error fetching rooms:", error);
      } else {
        setRooms(data);
      }
    };

    fetchRooms();
  }, []);

  return rooms[0];
};
