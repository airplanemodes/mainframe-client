import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { axiosRequest, serverAddress } from "../services/api";
import { userdataUpdate } from "../services/userdata";
import './styles/write.css';

export default function Write() {

    let [ user, setUser ] = useState();

    useEffect(() => {
        initializeUser();
    },[]);

    const initializeUser = async() => {
        let userinit = await userdataUpdate();
        // console.log(userinit);
        if (userinit.username) {
            setUser(userinit);
        } else {
            window.location = '/main';
        }
    };

    const { register, handleSubmit } = useForm();

    let titleRef = register('title', { required: true, maxLength: 60 });
    let nodeRef = register('node', { required: true, maxLength: 32 });
    let contentRef = register('content', { required: true, maxLength: 65536 });

    const writeEntry = async(formdata) => {
        try {
            const dateObj = new Date();
            formdata.created = `${dateObj.getFullYear()}-${dateObj.getMonth()+1}-${dateObj.getDate()}`;
            formdata.author = user.username;
            formdata.points = 0;
            // console.log(formdata);
            const url = serverAddress+'/entries';
            const response = await axiosRequest(url, 'POST', formdata);
            console.log(response);
            alert("Entry was written to the database");
            window.location = '/main';
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div id="write">
            <h3 id="writeHeader">Write a new entry</h3>
            <form id="writeForm" onSubmit={handleSubmit(writeEntry)}>
                {/* TODO: add table */}
                <label>Title</label>
                <input type={'text'} {...titleRef} />
                <br />
                <br />
                <label>Node</label>
                <select {...nodeRef}>
                    <option>code</option>
                    <option>network</option>
                    <option>hack</option>
                    <option>society</option>
                </select>
                <br />
                <br />
                <label>Content</label>
                <br />
                <textarea rows={12} {...contentRef}/>
                <br />
                <button>Write</button>
            </form>
            <a href='/main'><button id='writeReturn'>Return 0</button></a>
        </div>
    )
}