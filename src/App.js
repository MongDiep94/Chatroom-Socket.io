import './App.css';
import socketIO from 'socket.io-client';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home.js';
import Chatroom from './Components/Chatroom.js';

const socket = socketIO.connect('http://localhost:4000'); // Add this -- our server will run on port 4000, so we connect to it from here

function App() {

  return (
  <Routes>
    <Route path='/' element={<Home socket={socket} />}></Route>
    <Route path='/chat' element={<Chatroom socket={socket} />}></Route>
  </Routes>

  );
}

export default App;
