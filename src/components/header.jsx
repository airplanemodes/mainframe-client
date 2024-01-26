import { Fragment } from "react";
import { userdataUpdate } from "../services/userdata";

import "./styles/header.css";

// TODO: you have a new message!

export default function Header({ user }) {

    const userLogout = async() => {
        try {
            localStorage.removeItem("token");
            await userdataUpdate();
            window.location = "/";
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <header>
            <h1>Welcome to Mainframe</h1>
            <nav>
            { !localStorage.token ?
                <Fragment>
                    <h4>you are logged as guest</h4>
                    <a href="/"><button id="login-bar-button">Login</button></a>
                </Fragment>
                :
                <Fragment>
                    <h4>you are logged as { user.username }</h4>
                    <a href="/write"><button className="bar-button">Write</button></a>
                    <a href="/mailbox"><button className="bar-button">Mailbox</button></a>
                    <a href="/profile"><button className="bar-button">Profile</button></a>
                    <button id="logout-bar-button" className="bar-button" onClick={ userLogout }>Logout</button>
                </Fragment>
            }
            </nav>
        </header>
    );
}
