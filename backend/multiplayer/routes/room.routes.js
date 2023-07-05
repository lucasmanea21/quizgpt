module.exports = async (app) => {
  const room = require("../controllers/room.controller.js");

  const baseRoute = "/rooms";

  //   app.post(`${baseRoute}`, room.uploadQuiz);
  app.post(`${baseRoute}/create`, room.createRoom);
  app.post(`${baseRoute}/:roomId/join`, room.joinRoom);
  app.post(`${baseRoute}/:roomId/start`, room.startQuiz);
  app.put(`${baseRoute}/:roomId/next_step`, room.nextStep);

  app.get(`${baseRoute}/public`, room.fetchRooms);
  // app.post(`${baseRoute}/generate`, quiz.generateQuiz);
};
