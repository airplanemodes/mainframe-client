import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRequest, axiosRequest, serverAddress } from '../services/api';
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
            Hello
        </div>
    );
};
