module.exports = async (app) => {
  const users = require("../controllers/users.controller.js");

  const baseRoute = "/users";

  app.get(`${baseRoute}/online_count`, users.getOnlineCount);
  app.post(`${baseRoute}/update_activity`, users.updateActivity);
};
