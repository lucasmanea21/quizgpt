const { Configuration, OpenAIApi } = require("openai");
const { quizPrompt } = require("../prompts");
const { parseResponse } = require("./parseResponse");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateCompletion = async (subject) => {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "Hello world!" }],
  });

  console.log(completion.data.choices[0].message);

  return completion.data.choices[0].message;
};

const generateQuiz = async (context) => {
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: quizPrompt(context) }],
    });

    const parsedResponse = parseResponse(
      completion.data.choices[0].message.content
    );

    if (parsedResponse === "Quiz generation failed") {
      return generateQuiz(context);
    }

    return parsedResponse;
  } catch (error) {
    console.log("error.message", error.message);
    return error.message;
  }
};

const generateQuestions = async (context, numberOfQuestions) => {
  // Define the prompt for generating questions
  const questionPrompt = `Based on the following context: ${context}, generate ${
    numberOfQuestions || 10
  } unique quiz questions.
  
  Return to me only the questions in this format, to be directly compatible with Javascript:
  ["question": [question string]]
    
  Highlight the code with backticks.
  Just return the JSON array, without any other word.

  Return JSON code block, no talk, just go.
  `;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: questionPrompt }],
    });

    const parsedResponse = parseResponse(
      completion.data.choices[0].message.content
    );

    console.log("parsedResponse", parsedResponse);

    return parsedResponse;
  } catch (error) {
    console.log("error.message", error.message);
    return error.message;
  }
};

const generateAnswer = async (question) => {
  // Define the prompt for generating answers for a question
  const answerPrompt = `For the question "${question}", generate 4 possible answers with one correct one.
  
  Return to me only the quiz in this format, to be directly compatible with Javascript:
  [{question: "", options: [""], correct: "correct answer string"}]
    
  Highlight the code with backticks.
  Just return the JSON array, without any other word.
  `;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: answerPrompt }],
    });

    console.log(
      "completion answer",
      completion.data.choices[0].message.content
    );

    const parsedResponse = parseResponse(
      completion.data.choices[0].message.content
    );

    if (parsedResponse[0]?.options?.length == 0) {
      return generateAnswer(question);
    }

    if (!validateQuestionStructure(parsedResponse[0])) {
      return generateAnswer(question);
    }

    return {
      question,
      options: parsedResponse[0].options,
      correct: parsedResponse[0].correct,
    };
  } catch (error) {
    console.log("error.message", error.message);
    return error.message;
  }
};

const generateQuizFree = async (subject, context) => {
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: quizPrompt(subject, context) }],
    });

    const parsedResponse = parseResponse(
      completion.data.choices[0].message.content
    );

    if (parsedResponse === "Quiz generation failed") {
      return generateQuiz(subject, context);
    }

    return parsedResponse;
  } catch (error) {
    console.log("error.message", error.message);
    return error.message;
  }
};

module.exports = {
  generateCompletion,
  generateQuiz,
  generateQuestions,
  generateAnswer,
};
