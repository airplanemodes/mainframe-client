import { useState } from "react";
import { useForm } from "react-hook-form";
import { axiosRequest, host } from "../services/api";
import "./styles/register.css";

// TODO: add toast instead of alert

export default function Register() {

    let [ error, setError ] = useState(null);
    const { register, handleSubmit } = useForm();

    const submit = async(formdata) => {
        try {
            formdata.points = 0;
            const date = new Date();
            formdata.entered = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
            formdata.moderator = false;
            await axiosRequest(host+"/users", "POST", formdata);
            alert("User created successfully!");
            try {
                let response = await axiosRequest(host+"/login", "POST", formdata);
                localStorage.setItem("token", response.created);
                window.location = "/main";
            } catch (error) {
                error.code === "ERR_NETWORK" ? setError("server unavailable")
                                             : setError(error.response.data);
            }
        } catch (error) {
            if (error.response.data === "username already taken")
                setError("username already taken");
            else if (error.response.data === "email already taken")
                setError("email already taken");
            else
                setError(error.response.data);
        }
    }

    let usernameRef = register("username", { required: true, maxLength: 16 });
    let emailRef = register("email", { required: true , maxLength: 60 } );
    let passwdRef = register("passwd", { required: true }); 

    return (
        <section id="register">
            <form onSubmit={ handleSubmit(submit) }>
                <h2>Create new user</h2>
                    <table>
                    <tbody>
                        <tr>
                            <td><label>Username:</label></td>
                            <td><input type={"text"} {...usernameRef} /></td>
                        </tr>
                        <tr>
                            <td><label>Email:</label></td>
                            <td><input type={"email"} {...emailRef} /></td>
                        </tr>
                        <tr>
                            <td><label>Password:</label></td>
                            <td><input type={"password"} {...passwdRef} /></td>
                        </tr>
                    </tbody>
                    </table>
                { error && <div><br />{error}</div> }
                <button>Create</button>
            </form>
            <br />
            <p>continue as <a href="/main">guest</a></p>
            <p>back to <a href="/">login</a></p>
        </section>
    );
}
