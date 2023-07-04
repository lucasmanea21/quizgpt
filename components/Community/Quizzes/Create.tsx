import { useState, useEffect } from "react";
import Select from "react-select";
import { supabase } from "../../../utils/supabaseClient";

interface Question {
  id: number;
  question: string;
  subject: string; // Add subject field
  tags?: string[]; // Add tags field
}

interface QuizForm {
  name: string;
  difficulty: string;
  numberOfQuestions: number;
  questions: Question[];
}

export const CreateCommunityQuiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [form, setForm] = useState<QuizForm>({
    name: "",
    difficulty: "",
    numberOfQuestions: 1,
    questions: [],
  });
  const [subject, setSubject] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);

  // Get distinct tags from questions
  const allTags = [...new Set(questions?.flatMap((q) => q.tags))];
  const tagOptions = allTags.map((tag) => ({ label: tag, value: tag }));

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async (subject?: string, tags?: string[]) => {
    let query = supabase.from("questions").select("*");

    if (subject) {
      query = query.eq("subject", subject);
    }

    if (tags && tags.length > 0) {
      tags.forEach((tag) => {
        query = query.contains("tags", tag);
      });
    }

    const { data, error } = await query;

    if (error) console.log("Error fetching questions:", error);
    else setQuestions(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (selectedOptions) => {
    setForm({
      ...form,
      questions: selectedOptions.map((option) => option.value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from("community_quizzes").insert([
      {
        ...form,
        questions: form.questions.map((question) => question.id),
      },
    ]);

    if (error) console.log("Error submitting form:", error);
    else console.log("Quiz created:", data);
  };

  const questionOptions = questions.map((q) => ({
    value: q,
    label: q.question,
  }));

  return (
    <div className="flex flex-col items-center justify-center w-2/3 p-10 mt-10 bg-black rounded-md h-fit">
      <form onSubmit={handleSubmit} className="w-full p-4 space-y-4 text-white">
        <h2 className="mb-4 text-3xl font-bold">Create Quiz</h2>
        <p>Create quizzes and publish to everyone to try out.</p>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 text-sm font-bold">
            Quiz Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-3 py-2 text-gray-200 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="questions" className="block mb-2 text-sm font-bold">
            Questions
          </label>
          <Select
            id="questions"
            options={questionOptions}
            onChange={handleQuestionChange}
            className="text-black bg-zinc-800"
            isMulti // Enable multi-select
            styles={{
              option: (provided, state) => ({
                ...provided,
                color: state.isSelected ? "white" : "inherit",
                backgroundColor: state.isSelected ? "#1F2937" : "inherit",
              }),
            }}
          />
        </div>

        <button
          type="submit"
          className="w-full px-3 py-2 text-lg font-bold text-white rounded-md bg-zinc-500 hover:bg-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-700"
        >
          Create Quiz
        </button>
      </form>
    </div>
  );
};
