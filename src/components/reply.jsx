import { useForm } from "react-hook-form";
import { axiosRequest, serverAddress } from "../services/api";
import "./styles/reply.css";

export default function Reply(props) {

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
            <h3>Reply</h3>
            <textarea rows={4} maxLength={255} {...bodyRef}/>
            <button>Reply</button>
        </form>
    );
}