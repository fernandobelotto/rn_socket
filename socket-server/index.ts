import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://127.0.0.1:5173"],
  },
});

app.get("/", (req, res) => {
  res.json({ status: "ok!" });
});

io.on("connect", (socket) => {
  console.log("user connect!");

  socket.on("disconnect", () => {
    console.log("user disconnect!");
  });
  socket.on("hello", () => {
    io.emit('hello', 'my-data')
  });

});

httpServer.listen(3000, () => {
  // remenber to use ngrok to expose your local server using ngrok http 3000
  console.log("http://localhost:3000");
});

setInterval(() => {
  io.emit('message', new Date().toISOString());
}, 1000);