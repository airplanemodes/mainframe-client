import { useState, useEffect } from "react";
import { userdataUpdate } from "../services/userdata";

import Header from "./header";
import Feed from "./feed";
import Chat from "./chat";
import Footer from "./footer";
import "./styles/main.css";


export default function Main() {

    let [ user, setUser ] = useState();

    const initializeUser = async() => {
        let userobject = await userdataUpdate();
        if (userobject.username) setUser(userobject);
        else {
            setUser("guest");
            localStorage.removeItem("localToken");
        }
    }

    useEffect(() => {
        initializeUser();
    }, []);

    return (
        <main>
            <Header user={ user || "guest" }/>
                <table>
                <tbody>
                    <tr>
                        <td><Feed user={ user || "guest" }/></td>
                        <td>{ user !== "guest" && <Chat user={ user }/> }</td>
                    </tr>
                </tbody>
                </table>
            <Footer />
        </main>
    );
}