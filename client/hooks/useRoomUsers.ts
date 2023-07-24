import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { toast } from "react-toastify";

const useRoomUsers = (roomId: number) => {
  const [users, setUsers] = useState([]);

  const fetchProfileData = async (userId) => {
    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
      return null;
    }

    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("users_rooms")
        .select("*")
        .eq("room_id", roomId);

      if (error) {
        console.error("Error fetching users:", error);
      } else {
        // Extract user IDs
        const userIds = data.map((user) => user.user_id);

        // Use Promise.all to fetch profile data for all users
        const profiles = await Promise.all(
          userIds.map(async (userId) => await fetchProfileData(userId))
        );

        // Merge user data with profiles
        const usersWithProfiles = data.map((user, index) => {
          return profiles[index] ? { ...user, profile: profiles[index] } : null;
        });

        setUsers(usersWithProfiles.filter((user) => user !== null));
      }
    };

    fetchData();

    const myChannel = supabase
      .channel("any")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "users_rooms" },
        async (payload) => {
          // If a new user has joined the room, fetch the user's profile data and update the state
          if (payload.event === "INSERT") {
            const newUser = payload.new;
            const userProfile = await fetchProfileData(newUser.user_id);
            setUsers((prevUsers) => [
              ...prevUsers,
              { ...newUser, profile: userProfile },
            ]);
            toast.info("A new user has joined the room!");
          } else {
            // If it's not an INSERT event, refetch all users
            fetchData();
          }
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
