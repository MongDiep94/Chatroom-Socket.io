import express, { Router } from "express";
import cors from "cors";
import { Server } from "socket.io";
import { connectDB } from "./config/database.js";
import { router } from "./router/router.js";
import { createServer } from "http";

const app = express();

connectDB;

// appel du module cors pour lier les urls back et front
app.use(cors());

app.use(router);

const server = createServer(app);
//// Connect io with the front-react server and allow for CORS from http://localhost:3000 with GET and POST methods
const socketIO = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];
// Listen for when the client connects via socket.io-client
socketIO.on("connection", (socket) => {
  console.log(`${socket.id} user just connected`);

  //Listens and logs the message to the console
  socket.on("message", (data) => {
    socketIO.emit("messageResponse", data);
    console.log('message', data)
  });

  //Listens when a new user joins the server
  socket.on("newUser", (data) => {
    //Adds the new user to the list of users
    users.push(data);
    console.log(users);
    //Sends the list of users to the client
    socketIO.emit("newUserResponse", users);
  });

  socket.on("disconnect", () => {
    console.log(`An user disconnected`);
    //Updates the list of users when a user disconnects from the server
    users = users.filter((user) => user.socketID !== socket.id);
    // console.log(users);
    //Sends the list of users to the client
    socketIO.emit("newUserResponse", users);
    socket.disconnect();
  });
});

server.listen(4000, () => {
  console.log("Le serveur est bien exécuté sur le http://localhost:4000");
});
