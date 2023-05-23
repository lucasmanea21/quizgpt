// hooks/useResponses.ts
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

export const useResponses = (roomId, questionStep) => {
  const [loading, setLoading] = useState(true);
  const [responses, setResponses] = useState([]);

  console.log("roomId, questionStep", roomId, questionStep);

  useEffect(() => {
    const fetchResponses = async () => {
      const { data: responseData, error: responseError } = await supabase
        .from("responses")
        .select("*")
        .eq("room_id", roomId)
        .eq("step", questionStep);

      if (responseError) {
        console.error("Error fetching responses:", responseError);
      } else {
        const userIds = responseData.map((response) => response.user_id);
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .in("id", userIds);

        if (profileError) {
          console.error("Error fetching profiles:", profileError);
        } else {
          const enhancedResponses = responseData.map((response) => {
            return {
              ...response,
              profile: profileData.find(
                (profile) => profile.id === response.user_id
              ),
            };
          });
          setResponses(enhancedResponses);
        }
      }

      setLoading(false);
    };

    fetchResponses();
  }, [roomId, questionStep]);

  return { responses, loading };
};
