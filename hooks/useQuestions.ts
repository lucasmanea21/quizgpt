// hooks/useQuestions.ts
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";

export const useQuestions = (roomId: string) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data, error } = await supabase
        .from("rooms")
        .select("questions")
        .eq("id", roomId)
        .single();

      if (error) {
        console.error("Error fetching questions:", error);
      } else {
        setQuestions(data.questions || []);
      }
    };

    fetchQuestions();
  }, [roomId]);

  return questions;
};
