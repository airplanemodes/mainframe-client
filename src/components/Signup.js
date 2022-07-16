import React from "react";
import { useForm } from 'react-hook-form';
import { api_url, api_method } from '../services/api-service';

function Signup() {

    let { register, handleSubmit, formState: { errors } } = useForm();

    let usernameRef = register('username', { required:true, minLength: 4 });
    let passwordRef = register('password', { required:true, minLength: 4 });

    const onFormSubmit = async(formData) => {
        console.log(formData);
        let url = api_url + '/users';

        try {
            let data = await api_method(url, 'POST', formData);
            if (data._id) {
                alert('Success!');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className='signupForm'>
            <br />
            <label>Username</label><br />
            <input {...usernameRef} type='text'></input>
            <br />
            <label>Password</label><br />
            <input {...passwordRef} type='password'></input>
            <br />
            <label>E-mail</label><br />
            <input {...usernameRef} type='e-mail'></input>
            <br />
            <br />
            <button className="darkButton">Submit</button>
            <br />
            <br />
        </form>
    )
}

export default Signup;