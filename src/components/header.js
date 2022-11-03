import React, { useState, useEffect } from 'react';
import { userdataUpdate } from '../services/userdata';
import './header.css';

export default function Header() {

    let [ user, setUser ] = useState();

    useEffect(() => {
        initializeUser();
    },[]);
  
    const initializeUser = async() => {
        let userinit = await userdataUpdate();
        if (userinit.username) {
            setUser(userinit.username);
        } else {
            setUser("guest");
            localStorage.removeItem('localToken');
        }
    };

    const userLogout = async() => {
        localStorage.removeItem('localToken');
        await userdataUpdate();
        window.location = '/';
    };

    return (
        <header>
            <h1>10101010 Welcome to Mainframe 01010101</h1>
            { !localStorage.localToken ?
            <React.Fragment>
                <div className='userbar'>
                    <h4>logged as {user}</h4>
                    <a href='/'><button id='loginButton'>Login</button></a>
                </div>
            </React.Fragment>
            :
            <React.Fragment>
                <div className='userbar'>
                    <h4>logged as {user}</h4>
                    <a href='/write'><button id='writeButton'>Write</button></a>
                    <a href='/profile'><button id='profileButton'>Profile</button></a>
                    <button id='logoutButton' onClick={userLogout}>Logout</button>
                </div>
            </React.Fragment>
            }
        </header>
    )
};