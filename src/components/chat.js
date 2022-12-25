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
    socket.on("msgToClient", (dataFromSocket) => {
      setMessages(messages => [...messages, dataFromSocket]);
      console.log(dataFromSocket);
    });
  };

  const onSend = () => {
    socket.emit("msgFromClient", { msg: inputRef.current.value, id: props.user.id })
    console.log(inputRef.current.value);
  }

  useEffect(() => {
    socketListener();
  }, []);

	return (
		<div id='chat-box'>
      <h4>Message exchange</h4>
      <input ref={inputRef} type="text" />
      <button onClick={onSend}>Send</button>
    </div>
	);
};
