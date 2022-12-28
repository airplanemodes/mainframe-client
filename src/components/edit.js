import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { axiosRequest, serverAddress } from '../services/api';
import './styles/edit.css';

export default function Edit() {

  const { id } = useParams();
  const [ entry, setEntry ] = useState({});
  
  const getEntryForEditing = async() => {
    const url = serverAddress+'/edit/'+id;
    const data = await axiosRequest(url);
    setEntry(data);
  };
  
  useEffect(() => {
    getEntryForEditing();
    // eslint-disable-next-line
  }, []);
  
  const { register, handleSubmit } = useForm();

  let titleRef = register('title', { required: true, maxLength: 60 });
  let nodeRef = register('node', { required: true, maxLength: 32 });
  let contentRef = register('content', { required: true, maxLength: 65536 });

  const submitEdit = async(formdata) => {        
    try {
      formdata.author = entry.author;
      formdata.created = entry.created;
      formdata.id = entry.id;
      formdata.points = entry.points;
      const url = serverAddress+"/entries/"+formdata.id;
      console.log(formdata);
      // console.log(url);
      let response = await axiosRequest(url, 'PUT', formdata);
      console.log(response);
      window.location = '/main';
    } catch (error) {
      console.log(error);
    };
  };

  return (
    <div id='edit'>
      <h3 id='entryHeader'>Entry editing</h3>
      <form id='editForm' onSubmit={handleSubmit(submitEdit)}>
        <label>Title</label>
        <input type={'text'} {...titleRef} defaultValue={entry.title}/>
        <br />
        <br />
        <label>Node</label>
        <select {...nodeRef}>
          { entry.node === "code" ? <option selected>code</option> : <option>code</option> }
          { entry.node === "network" ? <option selected>network</option> : <option>network</option> }
          { entry.node === "hack" ? <option selected>hack</option> : <option>hack</option> }
          { entry.node === "society" ? <option selected>society</option> : <option>society</option> }
        </select>
        <br />
        <br />
        <label>Content</label>
        <br />
        <textarea rows={12} {...contentRef} defaultValue={entry.content}/>
        <br />
        <button>Save</button>
      </form>
      <a href='/main'><button id='editReturn'>Return 0</button></a>
    </div>
  );
};