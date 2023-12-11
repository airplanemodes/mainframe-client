import { useForm } from "react-hook-form";
import { axiosRequest, serverAddress } from "../services/api";
import "./styles/reply.css";

export default function Reply(props) {

    // console.log(props.user);
    // console.log(props.entryid);

    const { register, handleSubmit } = useForm();

    const writeReply = async(formdata) => {
        try {
            formdata.authorid = props.user.id;
            formdata.entryid = props.entryid;
            formdata.username = props.user.username;
            await axiosRequest(serverAddress+"/replies", "POST", formdata);
            window.location = "/entries/"+props.entryid;
        } catch (error) {
            console.log(error);
        }
    }

    let bodyRef = register("body", { required: true, maxLength: 255 });

    return (
        <form id="reply" onSubmit={handleSubmit(writeReply)}>
            <h3 id="reply-header">Reply</h3>
            <textarea id="reply-textarea" rows={4} maxLength={255} {...bodyRef}/>
            <button id="reply-button">Reply</button>
        </form>
    );
}