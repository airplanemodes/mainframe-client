import { useState, useEffect } from "react";
import { getRequest, serverAddress } from "../services/api";
import { userdataUpdate } from "../services/userdata";
import ReturnLight from "./buttons/return-light";
import "./styles/profile.css";

// TODO: consider to add a table

export default function Profile() {

    let [ profile, setProfile ] = useState({});
    let [ authored, setAuthored ] = useState([]);

    const initializeProfile = async() => {
        let userobject = await userdataUpdate();
        setProfile(userobject);
        if (!userobject.username) window.location = "/main";
        else {
            try {
                let entries = await getRequest(serverAddress+"/entries");
                let authoredArray = [];
                for (let i = 0; i < entries.length; i++)
                    if (entries[i].author === userobject.username)
                        authoredArray.push(entries[i]);
                setAuthored(authoredArray);
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        initializeProfile();
    }, []);

    return (
        <section id="profile">
            <h3>User profile</h3>
            <article>
                <h4>Username: {profile.username}</h4>
                <h4>Email: {profile.email}</h4>
                <h4>Points: {profile.points}</h4>
                <br />
                <h4>Enter date: {profile.entered}</h4>
                <br />
                { authored.length > 0 && <nav>
                    <h4>Authored entries: </h4>
                        <ul>
                        { authored.map(entry => {
                            return (
                                <li key={entry.id}>
                                    <a className="authored-link" href={"/entries/"+entry.id}>
                                        {entry.title}
                                    </a>
                                </li>
                            );
                        }) }
                        </ul>
                    </nav>
                }
            </article>
            <div>
                <ReturnLight />
            </div>
        </section>
    );
}