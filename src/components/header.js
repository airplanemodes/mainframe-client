import React from 'react';
import { userdataUpdate } from '../services/userdata';

import './styles/header.css';

export default function Header(props) {

    // console.log(props);

    const userLogout = async() => {
        try {
            localStorage.removeItem('localToken');
            await userdataUpdate();
            window.location = '/';
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <header>
            <h1 id='welcome'>Welcome to Mainframe</h1>
            <div id='userbar'>
            { !localStorage.localToken ?
                <React.Fragment>
                    <h4>you are logged as guest</h4>
                    <a href='/'><button id='login-bar-button'>Login</button></a>
                </React.Fragment>
                :
                <React.Fragment>
                    <h4>you are logged as {props.user.username}</h4>
                    <a href='/write'><button className='bar-button'>Write</button></a>
                    <a href='/mailbox'><button className='bar-button'>Mailbox</button></a>
                    <a href='/profile'><button className='bar-button'>Profile</button></a>
                    <button id='logout-bar-button' className='bar-button' onClick={userLogout}>Logout</button>
                </React.Fragment>
            }
            </div>
        </header>
    );
}