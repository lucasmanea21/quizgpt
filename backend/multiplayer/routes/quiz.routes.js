module.exports = async (app) => {
  const quiz = require("../controllers/quiz.controller.js");

  const baseRoute = "/quiz";

  app.post(`${baseRoute}/upload`, quiz.uploadQuiz);
  app.post(`${baseRoute}/generate`, quiz.generateQuizMultiple);
  app.get(`${baseRoute}/:quizId/question/:step`, quiz.getAnswer);
  app.post(`${baseRoute}/response`, quiz.answerQuestion);
  // app.post(`${baseRoute}/generate`, quiz.generateQuiz);
};
