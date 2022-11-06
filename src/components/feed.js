import './styles/feed.css';
import { axiosRequest, getRequest, serverAddress } from '../services/api';
import { useEffect, useState } from 'react';

export default function Feed(props) {

    // console.log(props);

    let [ entries, setEntries ] = useState([]);
    let [ activeNode, setActiveNode ] = useState('all');

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
        {/* Node switch buttons */}
        <nav id='nodeSwitch'>
            <button className={activeNode === 'all' ? 'activeNode' : 'nodeButton'}
                    onClick={async() => {
                        getEntries();
                        setActiveNode('all'); }}>all</button>
            <button className={activeNode === 'code' ? 'activeNode' : 'nodeButton'}
                    onClick={async() => {
                        let url = serverAddress+"/entries/node/code";
                        let data = await getRequest(url);
                        setActiveNode('code');
                        setEntries(data.reverse()); }}>code</button>
            <button className={activeNode === 'network' ? 'activeNode' : 'nodeButton'}
                    onClick={async() => {
                        let url = serverAddress+"/entries/node/network";
                        let data = await getRequest(url);
                        setActiveNode('network');
                        setEntries(data.reverse()); }}>network</button>
            <button className={activeNode === 'hack' ? 'activeNode' : 'nodeButton'}
                    onClick={async() => {
                        let url = serverAddress+"/entries/node/hack";
                        let data = await getRequest(url);
                        setActiveNode('hack');
                        setEntries(data.reverse()); }}>hack</button>
            <button className={activeNode === 'society' ? 'activeNode' : 'nodeButton'}
                    onClick={async() => {
                        let url = serverAddress+"/entries/node/society";
                        let data = await getRequest(url);
                        setEntries(data.reverse());
                        setActiveNode('society'); }}>society</button>
        </nav>


            {/* Entries feed */}
            {entries.length === 0 && <div className='noEntries'>Node is empty</div>}
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
                      <a href={'/entries/'+element.id}>
                          <button className='readButton'>Read</button>
                      </a>
                      
                      { props.user.username === element.author &&
                      <a href={'/edit/'+element.id}>
                          <button className='editButton'>Edit</button>
                      </a>}
                      
                      { props.user.moderator &&
                      <button onClick={async() => {
                          const url = serverAddress+'/entries/'+element.id;
                          await axiosRequest(url, "DELETE");
                          getEntries();
                      }} className='deleteButton'>Delete</button> }
                  </div>
                </article>
              )
            })}
        </div>
    )
};