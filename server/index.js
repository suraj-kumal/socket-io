const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 3000;
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");
const { createServer } = require("http");
const server = new createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(cors());

app.get("/", (req, res) => {
  res.send("welcome");
});
const secretKey = "raidenshogun";
app.get("/login", (req, res) => {
  try {
    const token = jwt.sign({ _id: "adgasjhdgjhsagd" }, secretKey);
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .json({ message: "Login Success" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//io means whole circuit
//socket means individual socket/client
//emit means send data
//on means recieve data
//broadcast means send to all socket/client except oneself
//to means to trigger events for particular rooms / its for private chat
//from means to join people in room

//middleware

io.use((socket, next) => {
  cookieParser()(socket.request, socket.request.res, (err) => {
    if (err) return next(err);

    const token = socket.request.cookies.token;
    if (!token) return next(new Error("Authentication Error"));

    const decoded = jwt.verify(token, secretKey);
    next();
  });
});
io.on("connection", (socket) => {
  console.log("user connected");
  console.log(`id : ${socket.id}`);
  // socket.emit("welcome", `welcome to the server`);
  socket.on("message", ({ message, room }) => {
    console.log(message, room);
    // io.emit("recievemessage", message);
    // socket.broadcast.emit("recievemessage", { message, room });
    // io.to(room).emit("recievemessage", message);
    socket.to(room).emit("recievemessage", message);
  });
  socket.on("joinRoom", (roomName) => {
    socket.join(roomName);
    console.log(`user joined ${roomName}`);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

server.listen(port, () => {
  console.log(`server is alive at port : ${port}`);
});
