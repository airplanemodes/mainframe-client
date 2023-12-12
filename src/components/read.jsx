import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRequest, serverAddress } from "../services/api";
import { userdataUpdate } from "../services/userdata";
import FullReplies from "./full-replies";
import Reply from "./reply";
import ReturnDark from "./buttons/return-dark";
import "./styles/read.css";

export default function Read() {

    const { id } = useParams();
    const [ entry, setEntry ] = useState({});
    const getSingleEntry = async() => {
        try {
            let data = getRequest(serverAddress+"/entries/"+id);
            data.then(value => setEntry(value));
        } catch (error) {
            console.log(error);
        }
    }
    
    const [ user, setUser ] = useState({});
    const initializeUser = async() => {
        let userinit = await userdataUpdate();
        if (userinit.username) setUser(userinit);
        else localStorage.removeItem("localToken");
    }

    let [ replies, setReplies ] = useState([]);
    const getReplies = async() => {
        try {
            let data = await getRequest(serverAddress+"/replies");
            setReplies(data);
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        getSingleEntry();
        getReplies();
        initializeUser();
        // eslint-disable-next-line
    }, []);

    let repliesMap = {};
    for (let i = 0; i < replies.length; i++)
        repliesMap[replies[i].entryid] = [];


    for (let i = 0; i < replies.length; i++) {
        if (repliesMap[replies[i].entryid]) {
            repliesMap[replies[i].entryid].push(replies[i]);
        }
    }
    
    return (
        <section>
            <div id="read">
            <h3>{ entry.title }</h3>
            <pre>{ entry.content }</pre>
            <p>by { user.username ? user.username === entry.author ? <a href={"/profile"}>{entry.author}</a>
                                                                   : <a href={"/users/"+entry.author}>{entry.author}</a> 
                                  : <span>{ entry.author } </span> }
                @ { entry.node } on { entry.created }
            </p>
                <div id="read-return">
                    <ReturnDark />
                </div>
            </div>
            { user.username && repliesMap[entry.id] && 
                <FullReplies repliesArray={repliesMap[entry.id]} /> }
            { user.username && <Reply user={user} entryid={id}/> }
        </section>
    );
}