import { useState, useEffect, useRef, Fragment } from "react";
import { io } from "socket.io-client";
import { host } from "../services/api";
import "./styles/chat.css";

const socket = io(host);

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
		<aside id="chat">
            <h4>Message exchange</h4>
            <table>
            <tbody>
            { messages.map((msg, index) => {
                return (
                    <tr key={index}>
                        { msg.name ?
                        <Fragment>
                            <td className="user-message">
                                <a className="user-link" href={"/users/"+msg.name}>{msg.name}</a>:
                            </td>
                            <td>{msg.msg}</td>
                        </Fragment> 
                        :
                        <td className="system-message">* {msg}</td> }
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