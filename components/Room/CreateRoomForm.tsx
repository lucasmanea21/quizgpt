import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import { useUser } from "@supabase/auth-helpers-react";
import { API_URL } from "../../utils/config";
import axios from "axios";
import { useRouter } from "next/router";

export const CreateRoomForm = () => {
  const user = useUser();
  const router = useRouter();

  const [subjects, setSubjects] = useState([]);
  const [subSubjects, setSubSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedSubSubject, setSelectedSubSubject] = useState(null);
  const [context, setContext] = useState("");

  console.log("user", user);

  useEffect(() => {
    // Fetch subjects from Supabase
    const fetchSubjects = async () => {
      const { data, error } = await supabase.from("categories").select("*");
      if (error) {
        console.error(error);
      } else {
        setSubjects(data);
      }
    };

    fetchSubjects();
  }, []);

  useEffect(() => {
    // Fetch sub-subjects when a subject is selected
    const fetchSubSubjects = async () => {
      const { data, error } = await supabase
        .from("sub_subjects")
        .select("*")
        .eq("subject_id", selectedSubject);

      if (error) {
        console.error(error);
      } else {
        setSubSubjects(data);
      }
    };

    if (selectedSubject) {
      fetchSubSubjects();
    }
  }, [selectedSubject]);

  console.log("selectedSubject", selectedSubject);

  const handleCreateRoom = async () => {
    try {
      const { data: roomData } = await supabase
        .from("rooms")
        .insert([
          {
            subject: selectedSubject,
            // context: context,
            owner_id: user.id,
          },
        ])
        .select();

      console.log("Room created:", roomData);

      router.push(`/room/${roomData[0].id}`);
      const response = await axios.post(`${API_URL}/quiz/generate`, {
        subject: selectedSubject,
        questions: 2,
        roomId: roomData[0].id,
      });

      console.log("Quiz generated:", response.data);
    } catch (error) {
      console.error("error", error.message, error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <select
        value={selectedSubject}
        onChange={(e) => setSelectedSubject(e.target.value)}
      >
        {subjects.map((subject) => (
          <option key={subject.id} value={subject.name}>
            {subject.name}
          </option>
        ))}
      </select>
      <select
        value={selectedSubSubject}
        onChange={(e) => setSelectedSubSubject(e.target.value)}
      >
        {subSubjects.map((subSubject) => (
          <option key={subSubject.id} value={subSubject.id}>
            {subSubject.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={context}
        onChange={(e) => setContext(e.target.value)}
        placeholder="Enter context"
      />
      <button
        onClick={handleCreateRoom}
        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
      >
        Create Room
      </button>
    </div>
  );
};
