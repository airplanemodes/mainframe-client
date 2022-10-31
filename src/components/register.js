import { useForm } from 'react-hook-form';
import { axiosRequest, serverAddress } from '../services/api';
import './register.css';

export default function Register() {

    const { register, handleSubmit } = useForm();

    const submit = async(formdata) => {
        try {
            // console.log(formdata);
            const url = serverAddress+"/users";
            await axiosRequest(url, 'POST', formdata);
        
        // TODO: client-side validation
        } catch (error) {
            if (error.response.data == 'username already taken') {
                alert("choose new username");
            } else if (error.response.data == 'email already taken') {
                alert("choose new email");
            }
        }
    };

    let usernameRef = register('username', { required: true, maxLength: 16 });
    let emailRef = register('email', { required: true , maxLength: 60 } );
    let passwdRef = register('passwd', { required: true }); 

    return (
        <div id='regform'>
            <form onSubmit={handleSubmit(submit)}>
                <h2>Create new user</h2>
                <table id='registerTable'>
                    <tbody>
                    <tr>
                        <td><label>Username: </label></td>
                        <td><input type={'text'} {...usernameRef} /></td>
                    </tr>
                    <tr>
                        <td><label>Email: </label></td>
                        <td><input type={'email'} {...emailRef} /></td>
                    </tr>
                    <tr>
                        <td><label>Password: </label></td>
                        <td><input type={'password'} {...passwdRef} /></td>
                    </tr>
                    </tbody>
                </table>
                <br />
                <button>Create</button>
            </form>
            <br />
            <p>continue as <a href="/main">guest</a></p>
            <p>back to <a href="/">login</a></p>
        </div>
    )
};