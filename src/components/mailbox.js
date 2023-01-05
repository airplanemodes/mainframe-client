import { useState } from 'react';
import ReturnLight from './buttons/return-light';
import './styles/mailbox.css';

export default function Mailbox(props) {

  let [ activeBox, setActiveBox ] = useState('inbox');

  return (
    <div id='mailbox'>
      <h3 id='mailbox-header'>Mailbox</h3>
      <nav id='mailbox-switch'>
        <button className={activeBox === 'inbox' ? 'active-box' : 'box-button'}
          onClick={async() => {
            setActiveBox('inbox');
          }}>
          Inbox
        </button>
        <button className={activeBox === 'sent' ? 'active-box' : 'box-button'}
          onClick={async() => {
            setActiveBox('sent');
          }}>
          Sent
        </button>
        <button className={activeBox === 'deleted' ? 'active-box' : 'box-button'}
          onClick={async() => {
            setActiveBox('deleted');
          }}>
          Deleted
        </button>
      </nav>
      <div id='pm-data'>

      </div>
      <div id='mailbox-return'>
        <ReturnLight />
      </div>
    </div>
  )
};