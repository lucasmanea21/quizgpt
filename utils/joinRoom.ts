// utils/joinRoom.ts

import { supabase } from "./supabaseClient";

export const joinRoom = async (roomId: number, userId: string) => {
  const { error } = await supabase
    .from("users_rooms")
    .insert([{ room_id: roomId, user_id: userId }]);

  if (error) {
    console.error(error);
    throw error;
  }
};
