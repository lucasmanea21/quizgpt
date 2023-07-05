const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

require("dotenv").config();

app.use(cors());
app.use(express.json());

require("./routes/quiz.routes")(app);
require("./routes/room.routes")(app);
require("./routes/score.routes")(app);
require("./routes/users.routes")(app);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    console.log("data", data);
    socket.join(data);
  });

  socket.on("start-quiz", () => {
    // Emit quiz start event to all clients
    io.emit("quiz-started");
  });

  socket.on("send_message", (data) => {
    console.log("data", data);
    socket.to(data.room).emit("receive_message", data);
  });
});

server.listen(8080, () => {
  console.log(`SERVER IS RUNNING on PORT: 8080`);
});
