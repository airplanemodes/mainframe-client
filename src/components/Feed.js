import React, { useState, useEffect } from 'react';
import { api_method, api_url } from '../services/api-service';
import { Link } from 'react-router-dom';

function Feed(props) {

    let [posts, setPosts] = useState([]);

    useEffect(() => {
        getFeed();
    }, [props.location]);

    const getFeed = async() => {
        let url = api_url + '/posts';
        let data = await api_method(url, 'GET');

        console.log(data);
        data.reverse();
        setPosts(data);
    }

    return (
        <article>
            <section className="feedBox">
                <h2>Posts feed</h2>
                <button className='darkButton'>
                    <Link to='/addpost'>Add post</Link>
                </button>
                <br />
                    {posts.map((item, i) => {
                        return (
                            <div key={item._id} className="post-single">
                                <h3>{item.postName}</h3>
                                <p>{item.postText}</p>
                            </div>
                        )
                    })}
            </section>
        </article>
    )
}

export default Feed