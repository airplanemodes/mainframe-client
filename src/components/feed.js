import './feed.css';
import { getRequest, serverAddress } from '../services/api';
import { useEffect, useState } from 'react';

export default function Feed() {

    const [ posts, setPosts ] = useState([]);

    useEffect(() => {
        let url = serverAddress+"/posts";
        getPosts(url);
    }, []);

    const getPosts = async(url) => {
        let data = await getRequest(url);
        setPosts(data);
    };

    return (
        <div>
            {posts.map((element) => {
                return (
                    <article className='elementArticle' key={element.id}>
                        <h2 className='elementTitle'>{element.title}</h2>
                        <p className='elementP'>{element.post}</p>
                        <a className='elementAuthor' href={'users/' + element.author}>{element.author}</a>
                    </article>
                )
            })}
        </div>
    )
};