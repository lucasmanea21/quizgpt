import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";

export const useTags = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      const { data, error } = await supabase
        .from("tags")
        .select()
        .order("id", { ascending: false });

      if (error) {
        console.error("Error fetching tags:", error);
      } else {
        setTags(data);
      }
    };

    fetchTags();
  }, []);

  return tags;
};
