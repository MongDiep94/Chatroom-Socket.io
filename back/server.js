import express, { Router } from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import { connectDB } from './config/database.js';
import { router } from './router/router.js';
import { createServer } from 'http';

const app = express();

connectDB

// appel du module cors pour lier les urls back et front
app.use(cors());

app.use(router);

const server = createServer(app);
//// Connect io with the front-react server and allow for CORS from http://localhost:3000 with GET and POST methods
const socketIO = new Server(server,{
  cors: {
    origin: 'http://localhost:3000'
  },
})

// Listen for when the client connects via socket.io-client
socketIO.on('connection', (socket) => {
  console.log(`${socket.id} user just connected`);

    //Listens and logs the message to the console
    socket.on('message', (data) => {
      socketIO.emit('messageResponse', data);
      console.log(data)
    });

  socket.on('disconnect', () => {
    console.log(`An user disconnected`)
  })

});

server.listen(4000, ()=>{
  console.log("Le serveur est bien exécuté sur le http://localhost:4000")
});
