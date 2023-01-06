import { useState } from 'react';
import ReturnLight from './buttons/return-light';
import Compose from './compose';
import './styles/mailbox.css';

export default function Mailbox(props) {

  let [ activeBox, setActiveBox ] = useState('inbox');

  return (
    <table id='pm-table'>
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
          <Compose />
        </td>
      </tr>
    </table>
  )
};