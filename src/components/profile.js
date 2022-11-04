import React, { useState, useEffect } from 'react';
import { getRequest, serverAddress } from '../services/api';
import { userdataUpdate } from '../services/userdata';
import './profile.css';

export default function Profile() {

    const [ profile, setProfile ] = useState({});
    const [ authored, setAuthored ] = useState([]);

    useEffect(() => {
        initializeProfile();
    },[]);
  
    const initializeProfile = async() => {
        let userinit = await userdataUpdate();
        setProfile(userinit);
        console.log(userinit); // User object
        if (!userinit.username) {
            window.location = '/main'; // Redirect if token expired
        } else {
            let url = serverAddress+"/entries";
            let entries = await getRequest(url); // All entries

            let authoredArray = [];
            for (let i = 0; i < entries.length; i++) {
                if (entries[i].author === userinit.username) {
                    authoredArray.push(entries[i]);
                }
            }
            setAuthored(authoredArray);
        }
    };

    return (
        <div id='profile'>
            <h3 id='profileHeader'>User profile</h3>
            <div id='userdata'>
                <h4>Username: {profile.username}</h4>
                <h4>Email: {profile.email}</h4>
                <h4>Points: {profile.points}</h4>
                <br />
                <h4>Enter date: {profile.entered}</h4>
                <br />
                <h4>Authored posts: </h4>
                <ul>
                {authored.map((element) => {
                    return (
                        <li key={element.id}>{element.title} (<a href={'/entries/'+element.id}>Read</a>)</li>
                        )
                    })}
                </ul>
            </div>
            <a href='/main'><button id='profileReturn'>Return 0</button></a>
        </div>
    )
};