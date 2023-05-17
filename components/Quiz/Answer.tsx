// components/Answer.tsx
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";

interface AnswerProps {
  roomId: string;
  questionStep: number;
}

export const Answer: React.FC<AnswerProps> = ({ roomId, questionStep }) => {
  const [responses, setResponses] = useState([]);

  console.log("questionStep, roomId", questionStep, roomId);

  useEffect(() => {
    const fetchResponses = async () => {
      let { data: responses, error } = await supabase
        .from("responses")
        .select("*")
        .eq("room_id", roomId)
        .eq("step", questionStep);

      if (error) console.log("Error fetching responses: ", error);
      else setResponses(responses);
    };

    fetchResponses();
  }, [roomId, questionStep]);

  return (
    <div className="p-4 bg-white border rounded shadow-md">
      <h2 className="mb-2 text-xl font-bold">Responses:</h2>
      {responses.map((response) => (
        <div key={response.user_id} className="mb-2">
          <p className="font-semibold">{response.user_id}:</p>
          <p>{response.answer}</p>
        </div>
      ))}
    </div>
  );
};
