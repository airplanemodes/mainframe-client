import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { axiosRequest, serverAddress } from '../services/api';
import './styles/compose.css';

export default function Compose(props) {

  // console.log(props);

  let [ receivers, setReceivers ] = useState([]);
  const { register, handleSubmit } = useForm();

  let bodyRef = register('body', { required: true, maxLength: 1024 });
  let subjectRef = register('subject', { required: false, maxLength: 16 });
  let receiverRef = register('receiver', { required: true });

  const sendPrivateMessage = async(formdata) => {
    try {
      formdata.sender = props.username;
      if (formdata.subject === "") delete formdata.subject;
      const url = serverAddress+'/privates';
      await axiosRequest(url, 'POST', formdata);
      window.location = '/mailbox';
    } catch (error) {
      console.log(error);
    }
  };

  const getReceiversList = async() => {
    const url = serverAddress+"/users/all";
    const data = await axiosRequest(url, 'GET');
    setReceivers(data);
  };

  useEffect(() => {
    getReceiversList();
  }, []);

  return (
    <form id='compose' onSubmit={handleSubmit(sendPrivateMessage)}>
      <h3>Compose</h3>
      <label>Receiver:</label>
      <select {...receiverRef}>
        {receivers.filter((element) => element.username !== props.username).map((element) => {
          return (
            <option key={element.id}>{element.username}</option>
          )
        })}
      </select>
      <br />
      <label>Subject:</label>
      <input type={'text'} maxLength={16} {...subjectRef}/>
      <textarea id='compose-textarea' rows={10} maxLength={255} {...bodyRef} />
      <button id='compose-button'>Send</button>
    </form>
  ) 
};