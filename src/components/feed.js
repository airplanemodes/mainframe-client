import './feed.css';
import { axiosRequest, getRequest, serverAddress } from '../services/api';
import { useEffect, useState } from 'react';
import { userdataUpdate } from '../services/userdata';

export default function Feed() {

    const [ user, setUser ] = useState({});
    const [ entries, setEntries ] = useState([]);

    useEffect(() => {
        initializeUser();
        getEntries();
    }, []);
    
    const initializeUser = async() => {
        let userinit = await userdataUpdate();
        setUser(userinit);
        console.log(userinit);
    }
    
    const getEntries = async() => {
        let url = serverAddress+"/entries";
        let data = await getRequest(url);
        setEntries(data.reverse());
    };

    return (
        <div id='entriesPage'>
            {entries.map((element) => {
                return (
                    <article className='elementArticle' key={element.id}>
                        <h2 className='elementTitle'>{element.title}</h2>
                        <p className='elementNode'>{element.node}</p>
                        <p className='elementP'>{element.content}</p>
                        <a className='elementAuthor' href={'users/'+element.author}>{element.author}</a>
                        <br />
                        <a href={'/entries/'+element.id}><button className='readButton'>Read</button></a>
                        { user.moderator && <button onClick={async() => {
                            // TODO: fix delete
                            const url = serverAddress+'/entries/'+element.id;
                            console.log(url);
                            const data = await axiosRequest(url, "DELETE");
                            console.log(data);
                        }} className='elementDelete'>Delete</button> }
                    </article>
                )
            })}
        </div>
    )
};