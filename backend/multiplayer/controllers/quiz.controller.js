const { createClient } = require("@supabase/supabase-js");
const {
  uploadQuiz,
  uploadQuestion,
  sendAnswer,
} = require("../db/supabase-admin");
const {
  generateCompletion,
  generateQuiz,
  generateQuestions,
  generateAnswer,
} = require("../utils/openai");

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_ANON_KEY || ""
);

exports.uploadQuiz = async (req, res, next) => {
  const { questions } = req.body;

  const { error } = await uploadQuiz({ questions });

  if (error) {
    return res.status(500).send({
      message: "Error uploading quiz.",
      details: error.message,
    });
  }

  return res.status(200).send({
    message: "Quiz uploaded!",
  });
};

exports.generateCompletion = async (req, res, next) => {
  const { subject } = req.body;

  const completion = await generateCompletion({ subject });

  return res.status(200).send({
    message: "Completion generated!",
    completion: completion,
  });
};

exports.generate = async (req, res, next) => {
  const { subject } = req.body;

  const completion = await generateCompletion({ subject });

  return res.status(200).send({
    message: "Completion generated!",
    completion: completion,
  });
};

exports.generateQuiz = async (req, res, next) => {
  const { subject } = req.body;

  const completion = await generateQuiz({ subject });

  return res.status(200).send({
    message: "Quiz generated!",
    completion: completion,
  });
};

exports.generateQuizMultiple = async (req, res, next) => {
  const { questions, userId, context } = req.body;

  let maxQuestions = 5;

  if (questions > maxQuestions) {
    return res.status(400).send({
      message: `Too many questions! Max ${maxQuestions} questions.`,
    });
  }

  try {
    // Generate questions first
    const questionsArr = await generateQuestions(context, questions);
    let tasks = [];

    // Generate answers for each question
    for (let question of questionsArr) {
      tasks.push(generateAnswer(question.question));
    }

    let finalQuiz = await Promise.all(tasks);

    console.log("finalQuiz", finalQuiz);

    // Insert the generated quiz into the database
    const { data, error } = await supabase
      .from("quizzes")
      .insert([{ questions: finalQuiz }])
      .select();

    if (error) {
      console.error(error);
      return res.status(500).send({
        message: "Error inserting quiz.",
        details: error.message,
      });
    }

    return res.status(200).send({
      message: "Quiz generated and stored successfully!",
      data: data[0],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      message: "Error generating quiz.",
      details: err.message,
    });
  }
};

exports.getAnswer = async (req, res, next) => {
  const { quizId, step } = req.params;

  try {
    const { data, error } = await supabase
      .from("questions")
      .select("*")
      .eq("quiz_id", quizId)
      .eq("step", step)
      .single();

    if (error) {
      throw error;
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.answerQuestion = async (req, res, next) => {
  const { userId, quizId, step, answerId } = req.body;

  // get quiz data

  const { data: quizData } = await supabase
    .from("rooms")
    .select("*")
    .eq("id", quizId)
    .single();

  if (!quizData.is_started) {
    // return res.status(400).json({ error: "Quiz has not started yet." });
  } else if (quizData.is_finished) {
    return res.status(400).json({ error: "Quiz has already finished." });
  } else if (quizData.step !== step) {
    return res.status(400).json({ error: "Quiz is on a different step." });
  }

  console.log("quizData", quizData);

  try {
    const response = await sendAnswer(userId, answerId, quizId, step);

    res.status(200).json("success");
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: error.message });
  }
};
