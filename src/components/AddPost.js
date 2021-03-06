import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// import { useHistory } from 'react-router-dom';
import { api_url, api_method } from '../services/api-service';

function AddPost() {

    let { register, handleSubmit, formState: { errors } } = useForm();
    // let history = useHistory();

    let namePointer = register('postName', { required: true, minLength: 2 });
    let textPointer = register('postText', { required: true, minLength: 2 });

    const onSubForm = async(postForm) => {
        console.log(postForm);

        try {
            let url = api_url + '/posts';
            let data = await api_method(url, 'POST', postForm);
            console.log(data);

            if (data._id) {
                alert('Successful!');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <article>
            <div className='addPostBox'>
                <h2>Add post</h2>
                    <form onSubmit={handleSubmit(onSubForm)}>
                        <div>
                            <label>Post name</label>
                            <br></br>
                            <input {...namePointer} type='text'/>
                        </div>
                        <br></br>
                        <div>
                            <label>Text</label>
                            <br></br>
                            <textarea {...textPointer} type='text' rows='10' cols='50' />
                        </div>
                        <br></br>
                        <button className='darkButton'>
                            <Link to='/'>Back</Link>
                        </button>
                        <button className='darkButton'>Add</button>
                    </form>
            </div>
        </article>
    )
}

export default AddPost;