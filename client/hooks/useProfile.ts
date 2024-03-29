import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";

const useProfile = (userId: string) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const updateProfile = async (updatedProfile) => {
    const { data, error } = await supabase
      .from("user_profiles")
      .update(updatedProfile)
      .eq("id", userId);

    if (error) {
      console.error("Failed to update profile", error);
      throw error;
    }

    setProfile(data && data[0]);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) console.error("Error fetching profile:", error);
      else setProfile(data);

      setLoading(false);
    };

    if (userId) fetchProfile();
  }, [userId]);

  return { profile, loading, updateProfile };
};

export default useProfile;
