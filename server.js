const http = require("http");
const path = require("path");
const express = require("express");
const { Server } = require("socket.io");

const app = express();
const httpServer = http.createServer(app);
const ioServer = new Server(httpServer);

app.use(express.static(path.join(__dirname, "public")));

ioServer.on("connection", (socket) => {
  console.log("user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});

const PORT = process.env.PORT ?? 8080;

httpServer.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
