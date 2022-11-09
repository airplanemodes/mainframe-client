import { useForm } from 'react-hook-form';
import { axiosRequest, serverAddress } from '../services/api';
import './styles/reply.css';

export default function Reply(props) {

    // console.log(props.user);
    // console.log(props.entryid);

    const { register, handleSubmit } = useForm();

    const writeReply = async(formdata) => {
        try {
            formdata.authorid = props.user.id;
            formdata.entryid = props.entryid;
            formdata.username = props.user.username;
            const url = serverAddress+"/replies";
            await axiosRequest(url, 'POST', formdata);
            window.location = '/entries/'+props.entryid;
        } catch (error) {
            console.log(error);
        };
    };

    let bodyRef = register('body', { required: true, maxLength: 255 });

    return (
        <form id='replyForm' onSubmit={handleSubmit(writeReply)}>
            <h3 id='replyHeader'>Reply</h3>
            <textarea id='replyTextArea' rows={4} maxLength={255} {...bodyRef}/>
            <button id='replyButton'>Reply</button>
        </form>
    )
}