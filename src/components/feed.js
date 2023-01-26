import './styles/feed.css';
import { axiosRequest, getRequest, serverAddress } from '../services/api';
import { useEffect, useState } from 'react';
import ShortReplies from './short-replies';
import ReadButton from './buttons/read-button';
import EditButton from './buttons/edit-button';
import Pagination from './pagination';

export default function Feed(props) {

  // console.log(props);

  let [ entries, setEntries ] = useState([]);
  let [ replies, setReplies ] = useState([]);
  let [ credits, setCredits ] = useState([]);
  let [ activeNode, setActiveNode ] = useState('all');
  
  const getEntries = async() => {
    try {
      let url = serverAddress+'/entries';
      let data = await getRequest(url);
      setEntries(data);
    } catch (error) {
      console.log(error);
    }
  }
  
  const getReplies = async() => {
    try {
      let url = serverAddress+'/replies';
      let data = await getRequest(url);
      setReplies(data);
    } catch (error) {
      console.log(error);
    }
  }

  const getCredits = async() => {
    try {
      let url = serverAddress+'/credits';
      let data = await getRequest(url);
      setCredits(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getEntries();
    getReplies();
    getCredits();
  }, []);
    

  let repliesMap = {};
  for (let i = 0; i < replies.length; i++) {
    repliesMap[replies[i].entryid] = [];
  }
  for (let i = 0; i < replies.length; i++) {
    if (repliesMap[replies[i].entryid]) {
      repliesMap[replies[i].entryid].push(replies[i]);
    }
  }


  let creditsMap = {};
  for (let i = 0; i < credits.length; i++) {
    creditsMap[credits[i].entryid] = [];
  }
  for (let i = 0; i < credits.length; i++) {
    if (creditsMap[credits[i].entryid]) {
      creditsMap[credits[i].entryid].push(credits[i].userid);
    }
  }
  

  const applyPlus = async(event) => {
    try {
      const creditData = {};
      creditData.entryid = event.currentTarget.getAttribute('elem');
      creditData.userid = props.user.id;
      const url = serverAddress+'/credits';
      await axiosRequest(url, 'POST', creditData);
      getCredits();
    } catch (error) {
      console.log(error);
    }
  }

  const applyMinus = async(event) => {
    try {
      const creditData = {};
      creditData.entryid = event.currentTarget.getAttribute('elem');
      creditData.userid = props.user.id;
      const url = serverAddress+'/credits';
      await axiosRequest(url, 'DELETE', creditData);
      getCredits();
    } catch (error) {
      console.log(error);
    }
  }

  
  return (
    <div id='entriesPage'>
      {/* Node switch buttons */}
      {/* =================== */}
      <nav id='nodeSwitch'>
        <button className={activeNode === 'all' ? 'active-node' : 'nodeButton'}
          onClick={async() => {
            getEntries();
            setActiveNode('all'); 
          }}>all</button>  
        <button className={activeNode === 'code' ? 'active-node' : 'nodeButton'}
          onClick={async() => {
            let url = serverAddress+"/entries/node/code";
            let data = await getRequest(url);
            setActiveNode('code');
            setEntries(data); 
          }}>code</button>  
        <button className={activeNode === 'network' ? 'active-node' : 'nodeButton'}
          onClick={async() => {
            let url = serverAddress+"/entries/node/network";
            let data = await getRequest(url);
            setActiveNode('network');
            setEntries(data); 
          }}>network</button>  
        <button className={activeNode === 'hack' ? 'active-node' : 'nodeButton'}
          onClick={async() => {
            let url = serverAddress+"/entries/node/hack";
            let data = await getRequest(url);
            setActiveNode('hack');
            setEntries(data);
          }}>hack</button>  
        <button className={activeNode === 'society' ? 'active-node' : 'nodeButton'}
          onClick={async() => {
            let url = serverAddress+"/entries/node/society";
            let data = await getRequest(url);
            setEntries(data);
            setActiveNode('society'); 
          }}>society</button>
          { activeNode === 'all' && <Pagination urlOfNodeTotal={'/entries/total/all'} /> }
          { activeNode === 'code' && <Pagination urlOfNodeTotal={'/entries/total/code'}/> }
          { activeNode === 'network' && <Pagination urlOfNodeTotal={'/entries/total/network'}/> }
          { activeNode === 'hack' && <Pagination urlOfNodeTotal={'/entries/total/hack'}/> }
          { activeNode === 'society' && <Pagination urlOfNodeTotal={'/entries/total/society'}/> }
      </nav>  
      {/* Entries feed */}
      {/* ============ */}
      {entries.length === 0 && <div id='no-entries'>Node is empty</div>}
      {entries.map((element) => {
        return (
          <article className='elementArticle' key={element.id}>
            <h2 className='elementTitle'>{element.title}</h2>
            <div className='elementNode'>@ {element.node}</div>
            <pre className='elementContent'>{element.content}</pre>
            { props.user === 'guest' && <div className='elementAuthor'>{element.author}</div> }
            { props.user.username === element.author ? <a className='elementAuthor' href={'/profile'}>
                                                        {element.author}
                                                       </a>
                                                     : <a className='elementAuthor' href={'/users/'+element.author}>
                                                        {element.author}
                                                       </a> }
            {/* Replies */}
            { props.user !== 'guest' && 
                <ShortReplies repliesArray={repliesMap[element.id]} />
            }
            {/* Entry buttons */}
            <br />
            <div className='feedButtons'>
              <ReadButton id={element.id} />
              { props.user.username === element.author &&
              <EditButton id={element.id} /> }
              { props.user.moderator &&
              <button onClick={async() => {
                  const url = serverAddress+'/entries/'+element.id;
                  await axiosRequest(url, 'DELETE');
                  getEntries();
                }} className='delete-button'>Delete</button> }
              { props.user.id ? (
                  creditsMap[element.id] ? (
                    creditsMap[element.id].includes(props.user.id) ?
                      <button className='minus-button' elem={element.id} onClick={applyMinus}>-</button> : 
                      <button className='plus-button' elem={element.id} onClick={applyPlus}>+</button>
                  ) : <button className='plus-button' elem={element.id} onClick={applyPlus}>+</button>
                ) : false }
              { props.user.id ? (
                  creditsMap[element.id] ? <div className='credits-counter'>Credits: {creditsMap[element.id].length}</div>
                                         : <div className='credits-counter'>Credits: 0</div>
                ) : false }
            </div>
          </article>
        )
      })}
    </div>
  );
}