import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { axiosRequest, host } from "../services/api";
import { userdataUpdate } from "../services/userdata";
import ReturnLight from "./buttons/return-light";
import "./styles/write.css";

// TODO: toast instead of alert

export default function Write() {

    let [ user, setUser ] = useState();

    const initializeUser = async() => {
        let userobject = await userdataUpdate();
        // console.log(userobject);
        if (userobject.username) setUser(userobject);
        else window.location = "/main";
    }

    useEffect(() => {
        initializeUser();
    }, []);

    const { register, handleSubmit } = useForm();

    let titleRef = register("title", { required: true, maxLength: 60 });
    let nodeRef = register("node", { required: true, maxLength: 32 });
    let contentRef = register("content", { required: true, maxLength: 65536 });

    const writeEntry = async(formdata) => {
        try {
            const dateObj = new Date();
            formdata.created = `${dateObj.getFullYear()}-${dateObj.getMonth()+1}-${dateObj.getDate()}`;
            formdata.author = user.username;
            formdata.points = 0;
            const url = host+"/entries";
            await axiosRequest(url, "POST", formdata);
            alert("Entry was written to the database!");
            window.location = "/main";
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section id="write">
            <h3>Write a new entry</h3>
            <form onSubmit={handleSubmit(writeEntry)}>
                <label>Title</label>
                <input type={"text"} {...titleRef} />
                <br />
                <label>Node</label>
                <select {...nodeRef}>
                    <option>code</option>
                    <option>network</option>
                    <option>hack</option>
                    <option>society</option>
                </select>
                <br />
                <label>Content</label>
                <br />
                <textarea rows={12} {...contentRef}/>
                <br />
                <button className="bar-button">Write</button>
            </form>
            <span>
                <ReturnLight />
            </span>
        </section>
    );
}
