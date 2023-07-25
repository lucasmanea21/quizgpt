// hooks/useResponses.ts
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

export const useResponses = (quizId, roomId, questionIndex) => {
  const [loading, setLoading] = useState(true);
  const [responses, setResponses] = useState([]);

  console.log("quizId, roomId, questionIndex", quizId, roomId, questionIndex);
  useEffect(() => {
    const fetchResponses = async () => {
      const { data: responseData, error: responseError } = await supabase
        .from("responses")
        .select("*")
        .eq("quiz_id", quizId)
        .eq("room_id", roomId)
        .eq("step", questionIndex);

      if (responseError) {
        console.error("Error fetching responses:", responseError);
      } else {
        const userIds = responseData.map((response) => response.user_id);
        console.log("userIds", userIds);
        const { data: profileData, error: profileError } = await supabase
          .from("user_profiles")
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
  }, [quizId, questionIndex]);

  return { responses, loading };
};
