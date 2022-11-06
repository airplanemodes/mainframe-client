import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosRequest, serverAddress } from '../services/api';
import './styles/edit.css';

export default function Edit() {

    const { id } = useParams();
    const [ entry, setEntry ] = useState({});

    const getEntryForEditing = async() => {
        const url = serverAddress+'/edit/'+id;
        const data = await axiosRequest(url);
        console.log(data);
        setEntry(data);
    }

    useEffect(() => {
        getEntryForEditing();
    },[]);

    return (
        <div id='edit'>
            <h3 id='entryHeader'>{entry.title}</h3>
            <div id='entryContent'>{entry.content}</div>
            {/* <div id="entryDate">{entry.created}</div> */}
            <div id='entrySignature'>
                <a href={'/users/'+entry.author}>{entry.author}</a>
                @ {entry.node} {entry.created}
            </div>
            <a href='/main'><button id='entryReturn'>Return 0</button></a>
        </div>
    );
};