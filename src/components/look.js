import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRequest, axiosRequest, serverAddress } from "../services/api";
import { userdataUpdate } from "../services/userdata";
import ReturnLight from "./buttons/return-light";
import "./styles/look.css";

// TODO: message button
// TODO: number of comments

export default function Look() {

    let look = useParams();
    // eslint-disable-next-line
    let [ user, setUser ] = useState([]);
    let [ profileForLook, setProfileForLook ] = useState([]);
    let [ authored, setAuthored ] = useState([]);
  
    const initializeUser = async() => {
        let userobject = await userdataUpdate();
        if (userobject.username) setUser(userobject);
        else {
            setUser("guest");
            localStorage.removeItem("localToken");
            window.location = "/main";
        }
    }

    const getProfileForLook = async() => {
        try {
            const data = await axiosRequest(serverAddress+"/users/"+look.username, "GET");
            setProfileForLook(data);
        } catch (error) {
            console.log(error);
        }
    }
  
    const getAuthored = async() => {
        try {
            let entries = await getRequest(serverAddress+"/entries"); // all entries
            let authoredArray = [];
            for (let i = 0; i < entries.length; i++)
                if (entries[i].author === look.username)
                    authoredArray.push(entries[i]);
            setAuthored(authoredArray);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        initializeUser();
        getProfileForLook();
        getAuthored();
        // eslint-disable-next-line
    }, []);
  
    return (
        <section id="look">
            <h2 id="look-header">Look</h2>
            <div id="look-username">User: {profileForLook.username}</div>
            <div id="look-entered">Entered Mainframe on {profileForLook.entered}</div>
            { authored.length > 0 && <div id="look-authored">
                <h4 id="authored-entries-heading">Authored entries:</h4>
                <ul>
                {authored.map((element) => {
                    return (
                        <li key={element.id}>
                            <a className="authored-link" href={"/entries/"+element.id}>
                                {element.title}
                            </a>
                        </li>
                    )
                })}
                </ul>
            </div>
            }
            <div id="look-return">
                <ReturnLight />
            </div>
        </section>
    );
}