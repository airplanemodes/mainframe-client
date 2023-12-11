import { useState, useEffect, useRef, Fragment } from "react";
import { io } from "socket.io-client";
import { serverAddress } from "../services/api";
import "./styles/chat.css";

const socket = io(serverAddress);

export default function Chat(props) {

    let [ messages, setMessages ] = useState([]);
    let inputRef = useRef();

    const socketListener = () => {
        socket.on("msgFromServer", (dataFromServer) => {
            setMessages(messages => [...messages, dataFromServer]);
            document.getElementById("chat-messages").scrollTop = 
            document.getElementById("chat-messages").scrollHeight;
        });
    }

    const onSend = (event) => {
        event.preventDefault();
        socket.emit("msgFromClient", { 
            msg: inputRef.current.value, 
            name: props.user.username 
        });
        inputRef.current.value = "";
        // console.log(`${props.user.username}: ${inputRef.current.value}`);
    }

    useEffect(() => {
        socketListener();
    }, []);

	return (
		<aside id="chat-box">
            <h4>Message exchange</h4>
            <table id="chat-messages">
            <tbody>
            { messages.map((element, index) => {
                return (
                    <tr key={index}>
                        { element.name ?
                        <Fragment>
                            <td className="user-message">
                                <a className="user-link" href={"/users/"+element.name}>{element.name}</a>:
                            </td>
                            <td>{element.msg}</td>
                        </Fragment> 
                        :
                        <td className="system-message">* {element}</td> }
                    </tr>
                )
            })}
            </tbody>
            </table>
            <form onSubmit={onSend} id="chat-form">
                <input id="chat-input" ref={inputRef} type="text" />
                <button id="chat-send" type="submit">Send</button>
            </form>
        </aside>
	);
}