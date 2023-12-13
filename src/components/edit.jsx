import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { axiosRequest, host } from "../services/api";
import ReturnLight from "./buttons/return-light";
import "./styles/edit.css";

export default function Edit() {

    const { id } = useParams();
    const [ entry, setEntry ] = useState({});
  
    const getEntryForEditing = async() => {
        try {
            const data = await axiosRequest(host+"/edit/"+id);
            setEntry(data);
        } catch (error) {
            console.log(error);
        }
    }
  
    useEffect(() => {
        getEntryForEditing();
        // eslint-disable-next-line
    }, []);
  
    const { register, handleSubmit } = useForm();

    let titleRef = register("title", { required: true, maxLength: 60 });
    let nodeRef = register("node", { required: true, maxLength: 32 });
    let contentRef = register("content", { required: true, maxLength: 65536 });

    const submitEdit = async(formdata) => {        
        try {
            formdata.author = entry.author;
            formdata.created = entry.created;
            formdata.id = entry.id;
            formdata.points = entry.points;
            await axiosRequest(host+"/entries/"+formdata.id, "PUT", formdata);
            window.location = "/main";
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section id="edit">
            <h3>Entry editing</h3>
            <form onSubmit={handleSubmit(submitEdit)}>
                <label>Title:</label>
                <input type={"text"} {...titleRef} defaultValue={entry.title}/>
                <br />
                <br />
                <label>Node:</label>
                <select {...nodeRef}>
                    { entry.node === "code" ? <option selected>code</option> : <option>code</option> }
                    { entry.node === "network" ? <option selected>network</option> : <option>network</option> }
                    { entry.node === "hack" ? <option selected>hack</option> : <option>hack</option> }
                    { entry.node === "society" ? <option selected>society</option> : <option>society</option> }
                </select>
                <br />
                <br />
                <label>Content</label>
                <br />
                <textarea rows={12} {...contentRef} defaultValue={entry.content}/>
                <br />
                <button>Save</button>
            </form>
            <span id="edit-return">
                <ReturnLight />
            </span>
        </section>
    );
}