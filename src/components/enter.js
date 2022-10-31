import { useForm } from 'react-hook-form';
import { axiosRequest, serverAddress } from '../services/api';
import './enter.css';

export default function Enter() {

    const { register, handleSubmit } = useForm();
    const submit = async(formdata) => {
        try {
            const url = serverAddress+"/login";
            let response = await axiosRequest(url, "POST", formdata);
            console.log(response);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    let usernameRef = register('username');
    let passwdRef = register('passwd');

    return (
        <div id='enter'>
            <form onSubmit={handleSubmit(submit)}>
                <h2>Please login</h2>
                <label>Username: </label>
                <input type={'text'} {...usernameRef} />
                <br />
                <label>Password: </label>
                <input type={'password'} {...passwdRef} />
                <br />
                <button>Login</button>
            </form>
            <br />
            <p>continue as <a href="/main">guest</a></p>
            <p>create new <a href="/register">user</a></p>
        </div>
    )
};