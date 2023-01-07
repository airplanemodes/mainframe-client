import { useEffect, useState } from 'react';
import { userdataUpdate } from '../services/userdata';
import ReturnLight from './buttons/return-light';
import Compose from './compose';
import './styles/mailbox.css';

export default function Mailbox() {

  let [ user, setUser ] = useState([]);
  let [ activeBox, setActiveBox ] = useState('inbox');

  const initializeUser = async() => {
    let userinit = await userdataUpdate();
    if (userinit.username) {
      setUser(userinit);
    } else {
      setUser("guest");
      localStorage.removeItem('localToken');
    };
  };

  useEffect(() => {
    initializeUser();
  }, []);

  return (
    <table id='pm-table'>
      <tbody>
      <tr>
        <td className='pm-table-td'>
          <div id='mailbox'>
            <h3 id='mailbox-header'>Mailbox</h3>
            <nav id='mailbox-switch'>
              <button 
                className={activeBox === 'inbox' ? 'active-box' : 'box-button'}
                onClick={async() => { setActiveBox('inbox'); }}>
                Inbox
              </button>
              <button 
                className={activeBox === 'sent' ? 'active-box' : 'box-button'}
                onClick={async() => { setActiveBox('sent'); }}>
                Sent
              </button>
              <button 
                className={activeBox === 'deleted' ? 'active-box' : 'box-button'}
                onClick={async() => { setActiveBox('deleted'); }}>
                Deleted
              </button>
            </nav>
            <div id='pm-data'>
              {/* TABLE */}
            </div>
            <div id='mailbox-return'>
              <ReturnLight />
            </div>
          </div>
        </td>
        <td className='pm-table-td'>
          <Compose username={user.username}/>
        </td>
      </tr>
      </tbody>
    </table>
  )
};