import { useState, useEffect, useRef, Fragment } from "react";
import { io } from "socket.io-client";
import { host } from "../services/api";
import "./styles/chat.css";

const socket = io(host);

export default function Chat({ user }) {

    let [ messages, setMessages ] = useState([]);
    let inputRef = useRef();

    const socketListener = () => {
        socket.on("msgFromServer", (dataFromServer) => {
            setMessages(messages => [...messages, dataFromServer]);
            document.getElementById("messages").scrollTop = 
            document.getElementById("messages").scrollHeight;
        });
    }

    const onSend = (event) => {
        event.preventDefault();
        socket.emit("msgFromClient", { 
            body: inputRef.current.value, 
            name: user.username 
        });
        inputRef.current.value = "";
        // console.log(`${user.username}: ${inputRef.current.value}`);
    }

    useEffect(() => {
        socketListener();
    }, []);

	return (
		<aside id="chat">
            <h4>Message exchange</h4>
            <table id="messages">
            <tbody>
            { messages.map((m, index) => {
                return (
                    <tr key={index}>
                        { m.name ?
                        <Fragment>
                            <td className="user-message">
                                <a className="user-link" href={"/users/"+m.name}>{m.name}</a>:
                            </td>
                            <td>{m.body}</td>
                        </Fragment> 
                        :
                        <td className="system-message">* {m}</td> }
                    </tr>
                )
            })}
            </tbody>
            </table>
            <form onSubmit={onSend} id="chat-form">
                <input ref={inputRef} type="text" />
                <button type="submit">Send</button>
            </form>
        </aside>
	);
}