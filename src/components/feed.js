import './styles/feed.css';
import { axiosRequest, getRequest, serverAddress } from '../services/api';
import { useEffect, useState } from 'react';
import ShortReplies from './short-replies';

export default function Feed(props) {

    // console.log(props);

    let [ entries, setEntries ] = useState([]);
    let [ replies, setReplies ] = useState([]);
    let [ activeNode, setActiveNode ] = useState('all');

    useEffect(() => {
        getEntries();
        getReplies();
    }, []);
    
    const getEntries = async() => {
        let url = serverAddress+'/entries';
        let data = await getRequest(url);
        setEntries(data);
    };

    const getReplies = async() => {
        let url = serverAddress+'/replies';
        let data = await getRequest(url);
        setReplies(data);
    };

    let repliesMap = {};
    for (let i = 0; i < replies.length; i++) {
        repliesMap[replies[i].entryid] = [];
    };
    
    for (let i = 0; i < replies.length; i++) {
        if (repliesMap[replies[i].entryid]) {
            repliesMap[replies[i].entryid].push(replies[i]);
        };
    };

    return (
      <div id='entriesPage'>
        {/* Node switch buttons */}
        {/* =================== */}
        <nav id='nodeSwitch'>
          <button className={activeNode === 'all' ? 'activeNode' : 'nodeButton'}
              onClick={async() => {
                  getEntries();
                  setActiveNode('all'); 
              }}>all</button>  
          <button className={activeNode === 'code' ? 'activeNode' : 'nodeButton'}
              onClick={async() => {
                  let url = serverAddress+"/entries/node/code";
                  let data = await getRequest(url);
                  setActiveNode('code');
                  setEntries(data); 
              }}>code</button>  
          <button className={activeNode === 'network' ? 'activeNode' : 'nodeButton'}
              onClick={async() => {
                  let url = serverAddress+"/entries/node/network";
                  let data = await getRequest(url);
                  setActiveNode('network');
                  setEntries(data); 
              }}>network</button>  
          <button className={activeNode === 'hack' ? 'activeNode' : 'nodeButton'}
              onClick={async() => {
                  let url = serverAddress+"/entries/node/hack";
                  let data = await getRequest(url);
                  setActiveNode('hack');
                  setEntries(data); 
              }}>hack</button>  
          <button className={activeNode === 'society' ? 'activeNode' : 'nodeButton'}
              onClick={async() => {
                  let url = serverAddress+"/entries/node/society";
                  let data = await getRequest(url);
                  setEntries(data);
                  setActiveNode('society'); 
              }}>society</button>
        </nav>

        {/* Entries feed */}
        {/* ============ */}
        {entries.length === 0 && <div className='noEntries'>Node is empty</div>}
        {entries.map((element) => {
          return (
            <article className='elementArticle' key={element.id}>
              <h2 className='elementTitle'>{element.title}</h2>
              <div className='elementNode'>{element.node}</div>
              <div className='elementContent'>{element.content}</div>
              <a className='elementAuthor' href={'users/'+element.author}>
                {element.author}
              </a>
              <br />
              {/* Replies */}
              { props.user !== 'guest' && 
                  <ShortReplies repliesArray={repliesMap[element.id]} />
              }
              {/* Entry buttons */}
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