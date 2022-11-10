import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRequest, axiosRequest, serverAddress } from '../services/api';
import ReturnLight from './buttons/return-light';
import './styles/look.css';

export default function Look() {

    let lookOn = useParams();
    let [ profileForLook, setProfileForLook ] = useState([]);
    let [ authored, setAuthored ] = useState([]);

    const getProfileForLook = async() => {
        const url = serverAddress+'/users/'+lookOn.username;
        const data = await axiosRequest(url, 'GET');
        console.log(data);
        setProfileForLook(data);
    };

    const getAuthored = async() => {
        const url = serverAddress+'/entries';
        let entries = await getRequest(url); // All entries
        let authoredArray = [];
        for (let i = 0; i < entries.length; i++) {
            if (entries[i].author === lookOn.username) {
                authoredArray.push(entries[i]);
            };
        };
        setAuthored(authoredArray);
    };

    useEffect(() => {
        getProfileForLook();
        getAuthored();
        // eslint-disable-next-line
    }, []);

    return (
        <div id='look'>
            <h2 id='look-header'>Look</h2>
            <div id='look-username'>User: {profileForLook.username}</div>
            <div id='look-entered'>Entered Mainframe on {profileForLook.entered}</div>
            { authored.length > 0 && <div id='look-authored'>
                    <h4>Authored entries: </h4>
                    <ul>
                        {authored.map((element) => {
                            return (
                                <li key={element.id}>{element.title} (
                                    <a href={'/entries/'+element.id}>Read</a>
                                )</li>
                            )
                        })}
                    </ul>
                </div>
            }
            <div id='look-return'>
                <ReturnLight />
            </div>
        </div>
    );
};
