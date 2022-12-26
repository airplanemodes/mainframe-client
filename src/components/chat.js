import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { serverAddress } from '../services/api';
import './styles/chat.css';

const socket = io(serverAddress, {
  // withCredentials: true,
  // extraHeaders: {
  //   "my-custom-header": "abcd"
  // }
});

export default function Chat(props) {

  let [ messages, setMessages ] = useState([]);
  let inputRef = useRef();

  const socketListener = () => {
    socket.on('msgFromServer', (dataFromServer) => {
      setMessages(messages => [...messages, dataFromServer]);
      console.log(dataFromServer);
    });
  };

  const onSend = () => {
    socket.emit("msgFromClient", { 
      msg: inputRef.current.value, 
      name: props.user.usernamename 
    });
    console.log(`${props.user.username}: ${inputRef.current.value}`);
  };

  useEffect(() => {
    socketListener();
  }, []);

	return (
		<aside id='chat-box'>
      <h4>Message exchange</h4>
      <div id='chat-messages'>
        One<br/>
        Two<br/>
        Three<br/>
      </div>
      <input id='chat-input' ref={inputRef} type='text' />
      <button id='chat-send' onClick={onSend}>Send</button>
    </aside>
	);
};
