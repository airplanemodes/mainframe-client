import { useForm } from "react-hook-form";
import { axiosRequest, host } from "../services/api";
import "./styles/reply.css";

export default function Reply({ user, entryid }) {

    const { register, handleSubmit } = useForm();

    const writeReply = async(formdata) => {
        try {
            formdata.authorid = user.id;
            formdata.entryid = entryid;
            formdata.username = user.username;
            await axiosRequest(host+"/replies", "POST", formdata);
            window.location = "/entries/"+entryid;
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