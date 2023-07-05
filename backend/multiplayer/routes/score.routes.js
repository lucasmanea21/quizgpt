module.exports = async (app) => {
  const score = require("../controllers/score.controller.js");

  const baseRoute = "/score";

  app.post(`${baseRoute}`, score.updateScore);
};
