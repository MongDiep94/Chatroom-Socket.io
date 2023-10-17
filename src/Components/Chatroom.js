import React, { useEffect, useState } from 'react';
import ChatBar from './ChatBar.js';
import ChatBody from './ChatBody.js';
import ChatFooter from './ChatFooter.js';

const Chatroom = ({ socket }) => {
  const [messages, setMessages] = useState([]);

  useEffect(()=>{
    socket.on('messageResponse', (data) =>{
      console.log('messageResponse', messages, data)
      return setMessages([...messages, data])
    });

  }, [socket, messages]);


  return (
    <div className="chat">
      <ChatBar socket={socket} />
      <div className="chat__main">
        <ChatBody messages={messages} />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};

export default Chatroom;
