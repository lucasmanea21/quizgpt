import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient"; // adjust this import according to your project structure

const useLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const { data: users, error } = await supabase
          .from("user_profiles")
          .select("id, name, quizzes")
          .order("quizzes", { ascending: false });

        if (error) {
          throw error;
        }

        setLeaderboard(users);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return { leaderboard, loading };
};

export default useLeaderboard;
