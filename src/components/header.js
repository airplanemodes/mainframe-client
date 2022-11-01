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
        if (userinit.length > 0) {
            setUser(userinit);
        } else {
            setUser("guest");
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
                <p>logged as {user}</p>
            </React.Fragment>
            :
            <React.Fragment>
                <div id='user'>
                    <h4>logged as {user}</h4>
                    <a href='/write'><button id='writeButton'>Write</button></a>
                    <button id='logoutButton' onClick={userLogout}>Logout</button>
                </div>
            </React.Fragment>
            }
        </header>
    )
};