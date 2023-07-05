const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_ANON_KEY || ""
);

exports.updateScore = async (req, res) => {
  const { userId, quizId } = req.body;

  try {
    // Fetch the quiz difficulty and responses
    const { data: quiz } = await supabase
      .from("quizzes")
      .select("difficulty")
      .eq("id", quizId)
      .single();
    const { data: responses } = await supabase
      .from("responses")
      .select("*")
      .eq("quiz_id", quizId)
      .eq("user_id", userId);

    // Calculate the base points for each question based on the quiz difficulty
    const basePoints = {
      easy: 10,
      medium: 20,
      hard: 30,
    };

    // Calculate the total score
    let score = 0;
    responses.forEach((response) => {
      const questionPoints = basePoints[quiz.difficulty];
      const timeBonus = 0;
      //   const timeBonus = calculateTimeBonus(response.elapsed_time); // Implement the time bonus calculation based on your chosen formula
      score += questionPoints + timeBonus;
    });

    // Store the user's score
    const { data: userScore, error } = await supabase
      .from("user_scores")
      .insert({ user_id: userId, quiz_id: quizId, score });

    if (error) {
      throw error;
    }

    res.json(userScore[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
