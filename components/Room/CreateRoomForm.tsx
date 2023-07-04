import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import { useUser } from "@supabase/auth-helpers-react";
import { API_URL } from "../../utils/config";
import axios from "axios";
import { useRouter } from "next/router";
import { useTags } from "../../hooks/useTags";
import FileUpload from "./FileUpload";

export const CreateRoomForm = () => {
  const user = useUser();
  const router = useRouter();
  const tags = useTags();

  const [subjects, setSubjects] = useState([]);
  const [subSubjects, setSubSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedSubSubject, setSelectedSubSubject] = useState(null);
  const [context, setContext] = useState("");

  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
  const [isPublic, setIsPublic] = useState(true);
  const [numQuestions, setNumQuestions] = useState(3);
  const [file, setFile] = useState(null);

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
            is_public: true,
            tags: selectedTags,
            // difficulty: selectedDifficulty,
            questions_number: numQuestions,
          },
        ])
        .select();

      console.log("Room created:", roomData);

      router.push(`/room/${roomData[0].id}`);

      const response = await axios.post(`${API_URL}/quiz/generate`, {
        subject: selectedSubject,
        questions: numQuestions,
        context: context,
        difficulty: selectedDifficulty,
        roomId: roomData[0].id,
      });

      console.log("Quiz generated:", response.data);
    } catch (error) {
      console.error("error", error.message, error);
    }
  };

  return (
    <div className="w-full max-w-md p-6 mx-auto text-white bg-black rounded-lg shadow-md bg-opacity-95">
      <h2 className="mb-4 text-2xl font-bold text-center">Create Quiz</h2>

      {/* Subjects */}
      <div className="mb-4">
        <label
          className="block mb-2 text-sm font-bold text-gray-200"
          htmlFor="subject"
        >
          Subject
        </label>
        <select
          id="subject"
          className="w-full px-3 py-3 leading-tight text-gray-200 rounded-md shadow appearance-none bg-zinc-900 focus:outline-none focus:shadow-outline"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.name}>
              {subject.name}
            </option>
          ))}
        </select>
      </div>

      {/* Tags */}
      <div className="mb-4">
        <label
          className="block mb-2 text-sm font-bold text-gray-200"
          htmlFor="tags"
        >
          Tags
        </label>
        <select
          id="tags"
          className="w-full p-2 px-3 py-3 leading-tight text-gray-200 rounded-md shadow appearance-none bg-zinc-900 focus:outline-none focus:shadow-outline"
          multiple
          onChange={(e) =>
            setSelectedTags(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
        >
          {tags.map((tag) => (
            <option key={tag.id} value={tag.name}>
              {tag.name}
            </option>
          ))}
        </select>
      </div>

      {/* Difficulty */}
      <div className="mb-4">
        <label
          className="block mb-2 text-sm font-bold text-gray-200"
          htmlFor="difficulty"
        >
          Difficulty
        </label>
        <select
          id="difficulty"
          className="w-full p-2 px-3 py-3 leading-tight text-gray-200 rounded-md shadow appearance-none bg-zinc-900 focus:outline-none focus:shadow-outline"
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      {/* Number of questions */}
      <div className="mb-4">
        <label
          className="block mb-2 text-sm font-bold text-gray-200"
          htmlFor="numQuestions"
        >
          Number of Questions
        </label>
        <input
          id="numQuestions"
          type="number"
          min="1"
          className="w-full p-2 px-3 py-3 leading-tight text-gray-200 rounded-md shadow appearance-none bg-zinc-900 focus:outline-none focus:shadow-outline"
          value={numQuestions}
          onChange={(e) => setNumQuestions(e.target.value)}
        />
      </div>

      {/* Is public */}
      {/* <div className="mb-4">
        <label
          className="block mb-2 text-sm font-bold text-gray-200"
          htmlFor="isPublic"
        >
          Is the room public?
        </label>
        <input
          id="isPublic"
          type="checkbox"
          className="mr-2 leading-tight"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        />
      </div> */}

      {/* Context */}
      <div className="mb-4">
        <label
          className="block mb-2 text-sm font-bold text-gray-200 "
          htmlFor="context"
        >
          Context
        </label>
        <input
          id="context"
          type="text"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="Enter context"
          className="w-full px-3 py-3 leading-tight text-gray-200 rounded-md shadow appearance-none bg-zinc-900 focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* File Upload */}
      <FileUpload onFileSelect={setFile} />

      <button
        onClick={handleCreateRoom}
        className="w-full px-4 py-3 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline"
      >
        Create Quiz
      </button>
    </div>
  );
};
