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
      console.log(formdata);
      const url = serverAddress+'/privates';
      const response = await axiosRequest(url, 'POST', formdata);
      console.log(response);
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
        {receivers.map((element) => {
          if (element.username !== props.username) {
            return (
              <option key={element.id}>{element.username}</option>
            )
          }
        })}
      </select>
      <br />
      <label>Subject:</label>
      <input type={'text'} maxLength={16} {...subjectRef}/>
      <textarea id='compose-textarea' rows={20} maxLength={255} {...bodyRef} />
      <button id='compose-button'>Send</button>
    </form>
  ) 
};