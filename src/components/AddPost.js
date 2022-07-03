import React from 'react';
import { useForm } from 'react-hook-form';
// import { useHistory } from 'react-router-dom';

function AddPost() {

    let { register, handleSubmit, formState: { errors } } = useForm();
    // let history = useHistory();

    let nameRef = register('postName', { required: true, minLength: 2 });
    let textRef = register('postText', { required: true, minLength: 2 });

    // TODO
    // const onSubForm = async(postForm) => {
    //     console.log(postForm);

    //     try {
            
    //     } catch (error) {
            
    //     }
    // }

    return (
        <article>
            <div className='addPostBox'>
                <h2>Add post</h2>
            </div>
        </article>
    )
}

export default AddPost