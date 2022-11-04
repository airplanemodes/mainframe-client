import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosRequest, getRequest, serverAddress } from '../services/api';
import './read.css';

export default function Read() {

    const { id } = useParams();
    const [ entry, setEntry ] = useState({});
    
    useEffect(() => {
        getSingleEntry();
    }, []);
    
    const getSingleEntry = async() => {
        let url = serverAddress+"/entries/"+id;
        let data = getRequest(url);
        data.then((value) => {
            console.log(value);
            setEntry(value);
        });
    }

    return (
        <div id='read'>
            <h3 id='entryHeader'>{entry.title}</h3>
            <div id='entryContent'>{entry.content}</div>
            {/* <div id="entryDate">{entry.created}</div> */}
            <div id='entrySignature'>
                <a href={'/users/'+entry.author}>{entry.author}</a>
                @ {entry.node} {entry.created}
            </div>
            <a href='/main'><button id='entryReturn'>Return 0</button></a>
        </div>
    )
};