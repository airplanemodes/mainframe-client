import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getRequest, axiosRequest, host } from "../services/api";
import { userdataUpdate } from "../services/userdata";
import ReturnLight from "./buttons/return-light";
import "./styles/look.css";

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
            localStorage.removeItem("token");
            window.location = "/main";
        }
    }

    const getProfileForLook = async() => {
        try {
            const data = await axiosRequest(host+"/users/"+look.username, "GET");
            setProfileForLook(data);
        } catch (error) {
            console.log(error);
        }
    }
  
    const getAuthored = async() => {
        try {
            let entries = await getRequest(host+"/entries"); // all entries
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
            <h2>Look</h2>
            <table>
                <tbody>
                    <tr>
                        <td>Username</td>
                        <td>{ profileForLook.username }</td>
                        <td>
                            <Link to="/mailbox" state={ profileForLook.username }>
                                <button>Message</button>
                            </Link>
                        </td>
                    </tr>
                    <tr>
                        <td>Entered</td>
                        <td>{ profileForLook.entered }</td>
                        <td><ReturnLight /></td>
                    </tr>
                    <tr>
                        <td>Replies</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>Points</td>
                        <td>0</td>
                    </tr>
                    { authored.length > 0 && <tr>
                        <td id="authored">Authored</td>
                        <td><ul>{ authored.map(entry => {
                            return (
                                <li key={ entry.id }>
                                    <a href={"/entries/"+entry.id}>
                                        { entry.title }
                                    </a>
                                </li>
                            )
                        }) }</ul></td>
                    </tr>}
                </tbody>
            </table>
        </section>
    );
}
