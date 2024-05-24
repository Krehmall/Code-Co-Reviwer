import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import http from "http";
import { fileURLToPath } from "url";
import { Server } from "socket.io";
import codeBlockRoutes from "./api/codeBlockRoutes.js";
import { insertInitCodeBlocks } from "./modules/codeBlockModule.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const app = express();
const port = process.env.PORT || 3000;
const socketPort = 3001;

// Middleware setup
app.use(express.static("public"));
app.use(express.json());

const corsOptions = {
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
};

app.use(cors(corsOptions));

// Routes setup
app.use("/api/code-blocks", codeBlockRoutes);

// Serve React app
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start Express server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Socket.io server setup
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const roomVisitors = {}; // Keep track of visitors per room

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`${socket.id} has joined the room "${roomId}"`);

    // Initialize visitor count for the room if not already initialized
    if (!roomVisitors[roomId]) {
      roomVisitors[roomId] = 0;
    }

    // Increment the visitor count for the room
    roomVisitors[roomId]++;

    // Emit an event to the first client in the room to disable editing
    if (roomVisitors[roomId] === 1) {
      socket.emit("disable-editing");
    }

    // Emit the visitor count to all clients in the room
    io.to(roomId).emit("visitor-count", roomVisitors[roomId]);
  });

  socket.on("leave-room", (roomId) => {
    socket.leave(roomId);
    console.log(`${socket.id} has left the room "${roomId}"`);

    // Decrement the visitor count for the room
    if (roomVisitors[roomId]) {
      roomVisitors[roomId]--;
      // If no more visitors are left in the room, delete the room entry
      if (roomVisitors[roomId] === 0) {
        delete roomVisitors[roomId];
      } else {
        // Emit the updated visitor count to all clients in the room
        io.to(roomId).emit("visitor-count", roomVisitors[roomId]);
      }
    }
  });

  socket.on("code-to-server", (data) => {
    console.log("Received:", data.code);
    socket.to(data.room).emit("code-to-client", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

// Start Socket.io server
server.listen(socketPort, () => {
  console.log(`Socket.io server running on http://localhost:${socketPort}`);
});

// Upload first data to MongoDBs
insertInitCodeBlocks();
