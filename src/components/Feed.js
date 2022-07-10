import React, { useState, useEffect } from 'react';
import { api_method, api_url } from '../services/api-service';

function Feed(props) {

    let [arr, setArr] = useState([]);

    useEffect(() => {
        getFeed();
    }, [props.location]);

    const getFeed = async() => {
        let url = api_url + '/posts';
        let data = await api_method(url, 'GET');

        console.log(data);
        data.reverse();
        setArr(data);
    }

    return (
        <article>
            <section className="feedBox">
                <h2>Posts feed</h2>
                    {arr.map((item, i) => {
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