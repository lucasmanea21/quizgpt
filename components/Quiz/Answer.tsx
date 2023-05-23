// components/Answer.tsx
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import useProfile from "../../hooks/useProfile";
import { useResponses } from "../../hooks/useResponses";
import { useAtom } from "jotai";
import { correctAnswerAtom } from "../../store/atom";

interface AnswerProps {
  roomId: string;
  questionStep: number;
}

export const Answer: React.FC<AnswerProps> = ({ roomId, questionStep }) => {
  const { responses, loading } = useResponses(roomId, questionStep);
  const [correctAnswer, setCorrectAnswer] = useAtom(correctAnswerAtom);

  console.log("responses", responses);

  //   useEffect(() => {
  //     const fetchResponses = async () => {
  //       let { data: responses, error } = await supabase
  //         .from("responses")
  //         .select("*")
  //         .eq("room_id", roomId)
  //         .eq("step", questionStep);

  //       if (error) console.log("Error fetching responses: ", error);
  //       else setResponses(responses);
  //     };

  //     fetchResponses();
  //   }, [roomId, questionStep]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4 bg-white border rounded shadow-md">
      <h2 className="mb-2 text-xl font-bold">Responses:</h2>
      {responses.map((response) => (
        <div key={response.user_id} className="mb-2">
          <p className="font-semibold">{response.profile.full_name}:</p>
          <p>
            {response.answer}{" "}
            {response.answer === correctAnswer && (
              <span className="text-green-500">(Correct)</span>
            )}
          </p>
        </div>
      ))}
      <div className="mt-4">
        <h2 className="mb-2 text-xl font-bold">Correct Answer:</h2>
        <p className="text-lg">{correctAnswer}</p>
      </div>
    </div>
  );
};
