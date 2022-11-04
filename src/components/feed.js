import './feed.css';
import { axiosRequest, getRequest, serverAddress } from '../services/api';
import { useEffect, useState } from 'react';

export default function Feed(props) {

    // console.log(props);

    const [ entries, setEntries ] = useState([]);

    useEffect(() => {
        getEntries();
    }, []);
    
    const getEntries = async() => {
        let url = serverAddress+"/entries";
        let data = await getRequest(url);
        setEntries(data.reverse());
    };

    return (
        <div id='entriesPage'>
            <nav id='nodeSwitch'>
                <button className='nodeButton'>code</button>
                <button className='nodeButton'>network</button>
                <button className='nodeButton'>hack</button>
                <button className='nodeButton'>society</button>
            </nav>
            {entries.map((element) => {
                return (
                    <article className='elementArticle' key={element.id}>
                        <h2 className='elementTitle'>{element.title}</h2>
                        <div className='elementNode'>{element.node}</div>
                        <div className='elementContent'>{element.content}</div>
                        <a className='elementAuthor' href={'users/'+element.author}>{element.author}</a>
                        <br />
                        <br />
                        <div className='feedButtons'>
                            <a href={'/entries/'+element.id}><button className='readButton'>Read</button></a>
                            { props.user.moderator && <button onClick={async() => {
                                const url = serverAddress+'/entries/'+element.id;
                                const data = await axiosRequest(url, "DELETE");
                                console.log(data);
                            }} className='elementDelete'>Delete</button> }
                        </div>
                    </article>
                )
            })}
        </div>
    )
};