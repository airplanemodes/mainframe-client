import { useForm } from 'react-hook-form';
import './enter.css';

export default function Enter() {

    const { register, handleSubmit } = useForm();
    const submit = data => console.log(data);

    let usernameRef = register('username');
    let passwdRef = register('password');

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