import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
const App = () => {
  const socket = useMemo(
    () =>
      io("http://localhost:3000", {
        withCredentials: true,
      }),
    []
  );
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketId, setSocketId] = useState("");
  const [roomName, setRoomName] = useState("");

  console.log(messages);
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message, room });
    setMessage("");
  };
  const JoinRoomHandler = (e) => {
    e.preventDefault();
    socket.emit("joinRoom", roomName);
    setRoomName("");
  };
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
      setSocketId(socket.id);
      console.log(socket.id);
    });
    socket.on("recievemessage", (message) => {
      console.log(message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    socket.on("welcome", (msg) => {
      console.log(`${msg}`);
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <Container maxWidth="sm">
      <Box sx={{ height: 300 }} />
      {/* <Typography variant="h1" component="div" gutterBottom>
        Welcome to socket io
      </Typography> */}

      <Typography variant="h6" component="div" gutterBottom>
        {socketId}
      </Typography>

      <form onSubmit={JoinRoomHandler}>
        <h5>Join Room</h5>
        <TextField
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          id="outlined-basic"
          label="RoomName"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary">
          Join
        </Button>
      </form>

      <form onSubmit={handleSubmit}>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="outlined-basic"
          label="Message"
          variant="outlined"
        />
        <TextField
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          id="outlined-basic"
          label="Room"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </form>
      <Stack>
        {messages.map((m, i) => (
          <Typography key={i} variant="h6" component="div" gutterBottom>
            {m}
          </Typography>
        ))}
      </Stack>
    </Container>
  );
};

export default App;
