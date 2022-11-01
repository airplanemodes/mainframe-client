import React, { useState, useEffect } from 'react';
import { userdataUpdate } from '../services/userdata';
import './profile.css';

export default function Profile() {

    const [ profile, setProfile ] = useState({});

    useEffect(() => {
        initializeUser();
    },[]);
  
    const initializeUser = async() => {
        let userinit = await userdataUpdate();
        setProfile(userinit);
        console.log(userinit);
    };

    return (
        <div id='profile'>
            <h3 id="profileHeader">User profile</h3>
            <div id='userdata'>
                <h4>Username: {profile.username}</h4>
                <h4>Email: {profile.email}</h4>
                <h4>Enter date: {profile.entered}</h4>
            </div>
            <a href='/main'><button id='returnButton'>Return 0</button></a>
        </div>
    )
};