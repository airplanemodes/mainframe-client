import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRequest, serverAddress } from '../services/api';
import { userdataUpdate } from '../services/userdata';
import FullReplies from './full-replies';
import Reply from './reply';
import ReturnDark from './buttons/return-dark';
import './styles/read.css';

export default function Read() {

  const { id } = useParams();
  const [ entry, setEntry ] = useState({});
  const [ user, setUser ] = useState({});
  
  const getSingleEntry = async() => {
    let url = serverAddress+"/entries/"+id;
    let data = getRequest(url);
    data.then((value) => {
      setEntry(value);
    });
  };
    
  const initializeUser = async() => {
    let userinit = await userdataUpdate();
    if (userinit.username) {
      setUser(userinit);
    } else {
      localStorage.removeItem('localToken');
    };
  };

  let [ replies, setReplies ] = useState([]);

  const getReplies = async() => {
    let url = serverAddress+'/replies';
    let data = await getRequest(url);
    setReplies(data);
  };
    
  useEffect(() => {
    getSingleEntry();
    getReplies();
    initializeUser();
    // eslint-disable-next-line
  }, []);

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
    <div>
      <div id='read'>
        <h3 id='entry-header'>{entry.title}</h3>
        <div id='entry-content'>{entry.content}</div>
        <div id='entry-signature'>
          <a href={'/users/'+entry.author}>{entry.author}</a>
          @ {entry.node} {entry.created}
        </div>
        <div id='read-return-div'>
          <ReturnDark />
        </div>
      </div>
      { user.username && repliesMap[entry.id] && 
        <FullReplies repliesArray={repliesMap[entry.id]} /> }
      { user.username && <Reply user={user} entryid={id}/> }
    </div>
  );
};