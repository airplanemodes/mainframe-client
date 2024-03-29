import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { axiosRequest, host } from "../services/api";
import { userdataUpdate } from "../services/userdata";
import "./styles/enter.css";

export default function Enter() {

    // eslint-disable-next-line
    let [ user, setUser ] = useState(null);
    let [ error, setError ] = useState(null);

    const initializeUser = async() => {
        let userinit = await userdataUpdate();
        setUser(userinit);
        if (userinit.username) window.location = "/main";
    }

    useEffect(() => {
        initializeUser();
    }, []);

    const { register, handleSubmit } = useForm();
    const submit = async(formdata) => {
        try {
            let response = await axiosRequest(host+"/login", "POST", formdata);
            localStorage.setItem("token", response.created);
            window.location = "/main";
        } catch (error) {
            error.code === "ERR_NETWORK" ? setError("server unavailable")
                                         : setError(error.response.data);
        }
    }

    let usernameRef = register("username");
    let passwdRef = register("passwd");

    return (
        <section id="enter">
            <form onSubmit={ handleSubmit(submit) }>
                <h2>Please login</h2>
                <label>Username: </label>
                <input type={"text"} {...usernameRef} />
                <br />
                <label>Password: </label>
                <input type={"password"} {...passwdRef} />
                <br />
                { error && <div id="login-error"><br />{ error }</div> }
                <button>Login</button>
            </form>
            <div id="login-options">
                <p>continue as <a href="/main">guest</a></p>
                <p>create new <a href="/register">user</a></p>
            </div>
            <p id="terms-notice">By entering the website you"re agreeing to our <a href="/terms">Terms</a> and confirm that you are at least 16 years of age.</p>
        </section>
    );
}
