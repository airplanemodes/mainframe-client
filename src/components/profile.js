import React, { useState, useEffect } from 'react';
import { getRequest, serverAddress } from '../services/api';
import { userdataUpdate } from '../services/userdata';
import ReturnLight from './buttons/return-light';
import './styles/profile.css';

export default function Profile() {

    let [ profile, setProfile ] = useState({});
    let [ authored, setAuthored ] = useState([]);

    const initializeProfile = async() => {
        let userobject = await userdataUpdate();
        setProfile(userobject);
        // console.log(userobject);
        // redirect if token expired
        if (!userobject.username) window.location = '/main';
        else {
            try {
                const url = serverAddress+'/entries';
                let entries = await getRequest(url); // all entries
                let authoredArray = [];
                for (let i = 0; i < entries.length; i++) {
                    if (entries[i].author === userobject.username) {
                        authoredArray.push(entries[i]);
                    }
                }
                setAuthored(authoredArray);
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        initializeProfile();
    }, []);

    return (
        <div id='profile'>
            <h3 id='profile-header'>User profile</h3>
            <div id='userdata'>
                <h4>Username: {profile.username}</h4>
                <h4>Email: {profile.email}</h4>
                <h4>Points: {profile.points}</h4>
                <br />
                <h4>Enter date: {profile.entered}</h4>
                <br />
                { authored.length > 0 && <div>
                    <h4>Authored entries: </h4>
                        <ul>
                        {authored.map((element) => {
                            return (
                                <li key={element.id}>{element.title} (<a className='read-word' href={'/entries/'+element.id}>Read</a>)</li>
                            )
                        })}
                        </ul>
                    </div>
                }
            </div>
            <div id='profile-return'>
              <ReturnLight />
            </div>
        </div>
    );
}