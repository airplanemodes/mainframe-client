import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { axiosRequest, host } from "../services/api";
import ReturnLight from "./buttons/return-light";
import "./styles/compose.css";

export default function Compose({ username, receiver }) {

    let [ receivers, setReceivers ] = useState([]);
    const { register, handleSubmit } = useForm();

    let bodyRef = register("body", { required: true, maxLength: 1024 });
    let subjectRef = register("subject", { required: false, maxLength: 16 });
    let receiverRef = register("receiver", { required: true });

    const sendPrivateMessage = async(formdata) => {
        try {
            formdata.sender = username;
            if (formdata.subject === "") delete formdata.subject;
            await axiosRequest(host+"/privates", "POST", formdata);
            window.location = "/mailbox";
        } catch (error) {
            console.log(error);
        }
    }

    const getReceiversList = async() => {
        try {
            const data = await axiosRequest(host+"/users/all", "GET");
            setReceivers(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getReceiversList();
    }, []);

    return (
        <section>
            <form id="compose" onSubmit={ handleSubmit(sendPrivateMessage) }>
                <h3>Compose</h3>
                <label>Receiver:</label>
                <select value={receiver} {...receiverRef}>
                    {receivers.filter(e => e.username !== username).map(e => {
                        return (
                            <option key={e.id}>{ e.username }</option>
                        )
                    })}
                </select>
                <br />
                <label>Subject:</label>
                <input type={"text"} maxLength={16} {...subjectRef}/>
                <textarea rows={8} maxLength={255} {...bodyRef} autoFocus={receiver}/>
                <button>Send</button>
            </form>
            <div id="compose-return">
                <ReturnLight />
            </div>
        </section>
  );
}