const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_ANON_KEY || ""
);

// TODO: check if correct
exports.createRoom = async (req, res, next) => {
  const { ownerId, quizId, isPublic, subject } = req.body;

  const questions = [
    {
      question:
        "Care este numărul maxim de jucători într-un joc în formă normală?",
      options: ["2", "3", "4", "Niciuna din ele"],
      correct: "Niciuna din ele",
    },
    {
      question:
        "In the game theory concept of 'Nash equilibrium', what does it mean for a player to be playing a 'dominant strategy'?",
      options: [
        "It is a strategy that always yields the best result for a player, no matter what strategies the other players choose.",
        "It is a strategy that is the most popular among all players in the game.",
        "It is a strategy that is only used in the final stage of the game.",
        "It is a strategy that relies on luck rather than skill.",
      ],
      correct:
        "It is a strategy that always yields the best result for a player, no matter what strategies the other players choose.",
    },
  ];

  try {
    const { data, error } = await supabase
      .from("rooms")
      .insert({
        owner_id: ownerId,
        // quiz_id: quizId,
        is_public: isPublic,
        is_started: false,
        subject: subject,
        questions: questions,
      })
      .select();

    if (error) {
      console.error(error);
      throw error;
    }

    console.log("data", data, error);

    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.fetchRooms = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from("rooms")
      .select("*")
      .eq("is_public", true);

    if (error) {
      throw error;
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.joinRoom = async (req, res, next) => {
  const { roomId } = req.params;
  const { userId } = req.body;

  //   todo: if user is already in a room, delete the old one

  try {
    const { data, error } = await supabase.from("users_rooms").insert([
      {
        user_id: userId,
        room_id: roomId,
      },
    ]);

    if (error) {
      throw error;
    }

    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.startQuiz = async (req, res, next) => {
  const { roomId } = req.params;

  //   todo: check if caller is owner of quiz

  try {
    // Start the quiz and set the step to 1
    const { data, error } = await supabase
      .from("rooms")
      .update({ is_started: true, step: 1 })
      .eq("id", roomId);

    if (error) {
      throw error;
    }

    // Send the updated quiz data to the client
    res.json(data);

    // todo: find replacement for this
    // Schedule step updates every 30 seconds
    const updateStepInterval = setInterval(async () => {
      console.log("ran");
      const { data: quizData } = await supabase
        .from("quizzes")
        .select("step")
        .eq("id", roomId)
        .single();

      const newStep = quizData.step + 1;

      // Update the step in the database
      await supabase.from("quizzes").update({ step: newStep }).eq("id", roomId);
    }, 5000);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.nextStep = async (req, res, next) => {
  const { roomId } = req.params;
  console.log("req.params", req.params);
  const { ownerId } = req.body;

  console.log("roomId", roomId, ownerId);

  try {
    // Check if the user making the request is the quiz owner
    const { data: quizData, error } = await supabase
      .from("rooms")
      .select("*")
      .eq("id", roomId)
      .single();

    if (error) {
      throw error;
    }

    if (quizData.owner_id !== ownerId) {
      res
        .status(403)
        .json({ error: "Only the quiz owner can move to the next step." });
      return;
    }

    // Update the current_step and last_step_completed_at in the database
    const newStep = quizData.step + 1;
    const now = new Date();

    console.log("quizData", quizData);

    console.log("newStep", newStep);

    const { data: updatedQuizData, updateError } = await supabase
      .from("rooms")
      .update({ step: newStep })
      .eq("id", roomId)
      .select("*");

    if (updateError) {
      throw updateError;
    }

    console.log("updatedQuizData", updatedQuizData);

    res.json(updatedQuizData[0]);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: error.message });
  }
};
