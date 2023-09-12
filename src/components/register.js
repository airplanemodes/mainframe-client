import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { axiosRequest, serverAddress } from '../services/api';
import './styles/register.css';

export default function Register() {

    let [ error, setError ] = useState(null);

    const { register, handleSubmit } = useForm();

    const submit = async(formdata) => {
        try {
            formdata.points = 0;
            const dateObj = new Date();
            formdata.entered = `${dateObj.getFullYear()}-${dateObj.getMonth()+1}-${dateObj.getDate()}`;
            formdata.moderator = false;
            console.log(formdata);
            const url = serverAddress+"/users";
            await axiosRequest(url, 'POST', formdata);
            alert("user created successfully");
            window.location = '/';
        }
        
        catch (error) {
            console.log(error);
            if (error.response.data === 'username already taken')
                setError('username already taken');
            else if (error.response.data === 'email already taken')
                setError('email already taken');
            else
                setError(error.response.data);
        }
    }

    let usernameRef = register('username', { required: true, maxLength: 16 });
    let emailRef = register('email', { required: true , maxLength: 60 } );
    let passwdRef = register('passwd', { required: true }); 

  return (
    <div id='register-form'>
      <form onSubmit={handleSubmit(submit)}>
        <h2>Create new user</h2>
        <table id='register-table'>
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
        { error && <div><br />{error}</div>}
        <button>Create</button>
      </form>
      <br />
      <p>continue as <a href="/main">guest</a></p>
      <p>back to <a href="/">login</a></p>
    </div>
  );
}