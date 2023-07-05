const { createClient } = require("@supabase/supabase-js");

console.log("urls", process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
require("dotenv").config();

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_ANON_KEY || ""
);

const uploadQuiz = async (questions) => {
  const { data, error } = await supabase.from("questions").insert([questions]);

  if (error) {
    console.log("error", error);
  }

  return { data, error };
};

const uploadQuestion = async (question) => {
  const { data, error } = await supabase.from("questions").insert(question);

  if (error) {
    console.log("error in uploading question", error);
  }

  return { data, error };
};

const sendAnswer = async (userId, answerId, quizId, step) => {
  try {
    const { data: existingResponse } = await supabase
      .from("responses")
      .select("id")
      .eq("user_id", userId)
      .eq("quiz_id", quizId)
      .eq("step", step)
      .single();

    let response;
    if (existingResponse) {
      // Update the existing response with the new answer
      const { data } = await supabase
        .from("responses")
        .update({ answer_id: answerId })
        .eq("id", existingResponse.id);
      response = data;
    } else {
      // Insert a new response for the user
      const { data, error } = await supabase.from("responses").insert([
        {
          user_id: userId,
          quiz_id: quizId,
          step: step,
          answer_id: answerId,
        },
      ]);
      console.log("data", data, error);
      response = data;
    }

    return response;
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = {
  uploadQuiz,
  uploadQuestion,
  sendAnswer,
  supabase,
};
