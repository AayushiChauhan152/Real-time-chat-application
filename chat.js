import express from "express";
import http from "http";
import { Server } from "socket.io";

const port = 3000;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(new URL("./index.html", import.meta.url).pathname);
});

//basic socket.io-
io.on("connection", (socket) => {
  socket.on("user-msg", (msg) => {
    io.emit("msg", msg);
  });
});

server.listen(port, () => {
  console.log(`Listening on ${port}`);
});
