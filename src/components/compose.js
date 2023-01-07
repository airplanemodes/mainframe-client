import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { axiosRequest, serverAddress } from '../services/api';
import './styles/compose.css';

export default function Compose(props) {

  // console.log(props);

  let [ receivers, setReceivers ] = useState([]);
  const { register, handleSubmit } = useForm();

  const sendPrivateMessage = async(formdata) => {
    try {
      // TODO
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
      <select>
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
      <input type={'text'} maxLength={32}/>
      <textarea id='compose-textarea' rows={20} maxLength={255} />
      <button id='compose-button'>Send</button>
    </form>
  ) 
};