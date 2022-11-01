import './feed.css';
import { getRequest, serverAddress } from '../services/api';
import { useEffect, useState } from 'react';

export default function Feed() {

    const [ entries, setEntries ] = useState([]);

    useEffect(() => {
        let url = serverAddress+"/entries";
        getEntries(url);
    }, []);
    
    const getEntries = async(url) => {
        let data = await getRequest(url);
        setEntries(data.reverse());
    };

    return (
        <div>
            {entries.map((element) => {
                return (
                    <article className='elementArticle' key={element.id}>
                        <h2 className='elementTitle'>{element.title}</h2>
                        <p className='elementNode'>{element.node}</p>
                        <p className='elementP'>{element.content}</p>
                        <a className='elementAuthor' href={'users/' + element.author}>{element.author}</a>
                    </article>
                )
            })}
        </div>
    )
};