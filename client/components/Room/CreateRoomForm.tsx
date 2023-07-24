import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import { useUser } from "@supabase/auth-helpers-react";
import { API_URL } from "../../utils/config";
import axios from "axios";
import { useRouter } from "next/router";
import { useTags } from "../../hooks/useTags";
import TextareaAutosize from "react-textarea-autosize";
import FileUpload from "./FileUpload";
import { FaUser, FaUsers } from "react-icons/fa";

export const CreateRoomForm = () => {
  const user = useUser();
  const router = useRouter();
  const tags = useTags();

  const [subjects, setSubjects] = useState([]);
  const [subSubjects, setSubSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedSubSubject, setSelectedSubSubject] = useState(null);
  const [context, setContext] = useState("");
  const [mode, setMode] = useState("solo");

  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
  const [isPublic, setIsPublic] = useState(true);
  const [numQuestions, setNumQuestions] = useState(3);
  const [file, setFile] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

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

  console.log("context", context);
  const handleCreateRoom = async () => {
    setIsLoading(true);
    try {
      const { data: quizData } = await axios.post(`${API_URL}/quiz/generate`, {
        subject: selectedSubject,
        questions: numQuestions,
        context: context,
        difficulty: selectedDifficulty,
      });

      console.log("Quiz generated:", quizData);

      if (mode === "solo") {
        // Solo mode: User can play right away
        // Redirect to the quiz page passing the generated quiz ID
        router.push(`/quiz/${quizData.data.id}`);
      } else if (mode === "multiplayer") {
        // Multiplayer mode: Create a room and link its quiz_id to the generated quiz
        const { data: roomData } = await supabase
          .from("rooms")
          .insert([
            {
              subject: selectedSubject,
              owner_id: user.id,
              is_public: true,
              questions: quizData.data.id, // Link the generated quiz ID to the room
              questions_number: numQuestions,
            },
          ])
          .select();

        console.log("Room created:", roomData);

        router.push(`/room/${roomData[0].id}`);
      }
    } catch (error) {
      console.error("error", error.message, error);
    } finally {
      setIsLoading(false); // hide loading spinner after the operation is complete
    }
  };

  const handleModeChange = (selectedMode) => {
    setMode(selectedMode);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full px-2 py-5 text-white rounded-lg shadow-md sm:max-w-md sm:p-6 bg-zinc-950 ">
      <div className="w-full px-4 mb-7">
        <h2 className="mb-2 text-3xl font-bold ">Quiz Creator</h2>
        <p className="text-base sm:text-sm">
          Easily generate quizzes on any subject, with the power of AI.
        </p>
      </div>

      {/* Mode Selector */}
      <div className="flex flex-col w-full px-2 mb-4 space-y-4 rounded-md sm:flex-row sm:space-y-0 sm:space-x-2">
        <button
          className={`flex-1 py-3 text-lg sm:text-md font-bold rounded-md items-center flex justify-center ${
            mode === "solo"
              ? "bg-blue-500 text-white"
              : "bg-zinc-900 text-gray-300 hover:bg-gray-700 hover:text-gray-200"
          }`}
          onClick={() => handleModeChange("solo")}
        >
          <FaUser className="mr-2" size="16" />
          Solo
        </button>
        <button
          className={`flex-1 py-3 text-lg sm:text-md font-bold rounded-md items-center flex justify-center ${
            mode === "multiplayer"
              ? "bg-blue-500 text-white"
              : "bg-zinc-900 text-gray-300 hover:bg-gray-700 hover:text-gray-200"
          }`}
          onClick={() => handleModeChange("multiplayer")}
        >
          <FaUsers className="mr-2" size="20" />
          Multiplayer
        </button>
      </div>

      <div className="w-full px-2 mt-2">
        {/* Subjects */}
        <div className="mb-4">
          <label
            className="block mb-2 text-lg font-bold text-gray-200 sm:text-md"
            htmlFor="subject"
          >
            Subject
          </label>
          <select
            id="subject"
            className="w-full px-3 py-3 text-base leading-tight text-gray-200 rounded-md shadow appearance-none sm:text-sm bg-zinc-900 focus:outline-none focus:shadow-outline"
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

        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          {/* Difficulty */}
          <div className="w-full sm:w-1/2">
            <label
              className="block mb-2 text-lg font-bold text-gray-200 sm:text-md"
              htmlFor="difficulty"
            >
              Difficulty
            </label>
            <select
              id="difficulty"
              className="w-full p-2 px-3 py-3 text-base leading-tight text-gray-200 rounded-md shadow appearance-none sm:text-sm bg-zinc-900 focus:outline-none focus:shadow-outline"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {/* Number of questions */}
          <div className="w-full mb-4 sm:w-1/2">
            <label
              className="block mb-2 text-lg font-bold text-gray-200 sm:text-md"
              htmlFor="numQuestions"
            >
              Number of Questions
            </label>
            <input
              id="numQuestions"
              type="number"
              min="1"
              className="w-full p-2 px-3 py-3 text-base leading-tight text-gray-200 rounded-md shadow appearance-none sm:text-sm bg-zinc-900 focus:outline-none focus:shadow-outline"
              value={numQuestions}
              onChange={(e) => setNumQuestions(e.target.value)}
            />
          </div>
        </div>

        {/* Context */}
        <div className="my-4">
          <label
            className="block mb-2 text-lg font-bold text-gray-200 sm:text-md"
            htmlFor="context"
          >
            Context
          </label>
          <TextareaAutosize
            id="context"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="Create a very hard quiz about the history of programming. Mention people like Alan Turing, Ada Lovelace, and Charles Babbage."
            className="w-full px-3 py-3 text-base leading-tight text-gray-200 rounded-md shadow appearance-none sm:text-sm bg-zinc-900 focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* File Upload */}
        <FileUpload onFileSelect={setFile} />

        {!isLoading ? (
          <button
            onClick={handleCreateRoom}
            className="w-full px-4 py-3 text-lg font-bold text-white bg-blue-500 rounded-md sm:text-md hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          >
            Create Quiz
          </button>
        ) : (
          <button
            disabled
            className="w-full px-4 py-3 text-lg font-bold text-white bg-blue-800 rounded-md sm:text-md focus:outline-none focus:shadow-outline"
          >
            Creating quiz...
          </button>
        )}
      </div>
    </div>
  );
};
