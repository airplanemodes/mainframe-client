import { useForm } from 'react-hook-form';
import './styles/compose.css';

export default function Compose(props) {

  const { register, handleSubmit } = useForm();

  const sendPrivateMessage = async(formdata) => {
    try {
      // TODO
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form id='compose' onSubmit={handleSubmit(sendPrivateMessage)}>
      <h3 id='compose-header'>Compose</h3>
      <textarea id='compose-textarea' rows={24} maxLength={255} />
      <button id='compose-button'>Send</button>
    </form>
  ) 
};