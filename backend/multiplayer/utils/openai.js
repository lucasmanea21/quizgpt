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
};
