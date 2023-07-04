// utils/joinRoom.ts

import { supabase } from "./supabaseClient";

export const joinRoom = async (roomId, userId) => {
  // Remove the user from any rooms they're currently in
  const { error: removeError } = await supabase
    .from("users_rooms")
    .delete()
    .eq("user_id", userId);

  if (removeError) {
    console.error("Error removing user from previous room:", removeError);
    return;
  }

  // Add the user to the new room
  const { error: insertError } = await supabase
    .from("users_rooms")
    .insert([{ room_id: roomId, user_id: userId }]);

  if (insertError) {
    console.error("Error joining room:", insertError);
    return;
  }

  // Success!
  console.log("Successfully joined room:", roomId);
};
