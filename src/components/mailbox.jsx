import { useEffect, useState } from "react";
import { axiosRequest, host } from "../services/api";
import { userdataUpdate } from "../services/userdata";
import Compose from "./compose";
import "./styles/mailbox.css";
import { useLocation } from "react-router-dom";

// TODO: reply button
// TODO: mailbox is empty

export default function Mailbox() {

    let { state } = useLocation();
    let [ user, setUser ] = useState([]);
    let [ activeBox, setActiveBox ] = useState("inbox");
    let [ privateMessages, setPrivateMessages ] = useState([]);

    const initializeUser = async() => {
        let userobject = await userdataUpdate();
        if (userobject.username) setUser(userobject);
        else {
            setUser("guest");
            localStorage.removeItem("token");
            window.location = "/main";
        }
    }

    const getPrivateMessages = async() => {
        try {
            const data = await axiosRequest(host+"/privates");
            setPrivateMessages(data.reverse());
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        initializeUser();
        getPrivateMessages();
    }, []);

  return (
      <section>
      <div id="mailbox">
      <h3>Mailbox</h3>
      <nav>
          <button 
            className={activeBox === "inbox" ? "active-box" : null}
            onClick={ async() => setActiveBox("inbox") }>Inbox</button>
          <button 
            className={activeBox === "sent" ? "active-box" : null}
            onClick={ async() => setActiveBox("sent") }>Sent</button>
          <button 
            className={activeBox === "deleted" ? "active-box" : null}
            onClick={ async() => setActiveBox("deleted") }>Deleted</button>
      </nav>
      <table id="mail">
      <thead>
      <tr>
      { activeBox === "inbox" && <th className="mail-heading">From</th> }
      { activeBox === "sent" && <th className="mail-heading">To</th> }
      { activeBox === "deleted" && <th className="mail-heading">Box</th> }
      { activeBox === "inbox" && <th className="mail-heading">Subject</th> }
      { activeBox === "sent" && <th className="mail-heading">Subject</th> }
      { activeBox === "deleted" && <th className="mail-heading">Author</th> }
      <th className="mail-heading">Message</th>
      { activeBox === "inbox" && <th className="mail-heading">Del</th> }
      { activeBox === "sent" && <th className="mail-heading">Del</th> }
      { activeBox === "deleted" && <th className="mail-heading">Recover</th> }
      { activeBox === "deleted" && <th className="mail-heading">Del</th> }
      </tr>
      </thead>
      <tbody>
      { activeBox === "inbox" && 
          privateMessages.filter(msg => msg.receiver === user.username)
                         .filter(msg => msg.receiver_del !== true)
                         .map(msg => { 
              return (
                  <tr className="mail-row" key={msg.id}>
                  <td className="msg">
                      <a href={"/users/"+msg.sender} className="sender-link">{msg.sender}</a>
                  </td>
                  { msg.subject ? <td className="msg-subject">{msg.subject}</td>
                                    : <td className="msg-subject">...</td> }
                  <td className="msg-body">{msg.body}</td>
                  <td className="msg">
                      <button className="mail-btn" onClick={async() => {
                          try {
                              await axiosRequest(host+"/privates/receiver-del/"+msg.id, "PUT", msg.id);
                              getPrivateMessages();
                          } catch (error) {
                              console.log(error);
                          }
                      }}>x</button>
                  </td>
                  </tr>)}) }
      { activeBox === "sent" && 
          privateMessages.filter((msg) => msg.sender === user.username)
                         .filter((msg) => msg.sender_del !== true)
                         .map((msg) => {
              return (
                  <tr className="mail-row" key={msg.id}>
                  <td className="msg">
                      <a href={"/users/"+msg.receiver} className="sender-link">{msg.receiver}</a>
                  </td>
                  { msg.subject ? <td className="msg-subject">{msg.subject}</td>
                                    : <td className="msg-subject">...</td> }
                  <td className="msg-body">{msg.body}</td>
                  <td className="msg">
                      <button className="mail-btn"
                          onClick={async() => {
                              try {
                                  await axiosRequest(host+"/privates/sender-del/"+msg.id, "PUT", msg.id);
                                  getPrivateMessages();
                              } catch (error) {
                                  console.log(error);
                              }
                          }}>x</button>
                  </td>
                  </tr> )}) }
      { activeBox === "deleted" && 
            privateMessages.filter(msg => msg.sender === user.username || msg.receiver === user.username)
                           .filter(msg => (msg.sender === user.username && msg.sender_full_del !== true) 
                                                || (msg.receiver === user.username && msg.receiver_full_del !== true))
                           .filter(msg => (msg.sender === user.username && msg.sender_del === true) 
                                                || (msg.receiver === user.username && msg.receiver_del === true))
                           .map(msg => {
                return (
                    <tr className="mail-row" key={msg.id}>
                    { msg.sender === user.username ? <td className="msg">Sent</td>
                                                       : <td className="msg">Inbox</td> }
                    { msg.receiver === user.username && <td className="msg">{msg.sender}</td> }
                    { msg.sender === user.username && <td className="msg">{msg.sender}</td> }
                    <td className="msg-body">{msg.body}</td>
                    <td className="msg">
                        <button className="mail-btn" onClick={async() => {
                            if (msg.sender === user.username) {
                                try {
                                    await axiosRequest(host+"/privates/sender-rec/"+msg.id, "PUT", msg.id);
                                    getPrivateMessages();
                                } catch (error) {
                                    console.log(error);
                                }
                            } else {
                                try {
                                    await axiosRequest(host+"/privates/receiver-rec/"+msg.id, "PUT", msg.id);
                                    getPrivateMessages();
                                } catch (error) {
                                    console.log(error);
                                }
                            }
                        }}>R</button>
                    </td>
                    <td className="msg">
                        <button className="mail-btn" onClick={async() => {
                            if (msg.sender === user.username) {
                                try {
                                    await axiosRequest(host+"/privates/sender-fulldel/"+msg.id, "PUT", msg.id);
                                    getPrivateMessages();
                                } catch (error) {
                                    console.log(error);
                                }
                            } else {
                                try {
                                    await axiosRequest(host+"/privates/receiver-fulldel/"+msg.id, "PUT", msg.id);
                                    getPrivateMessages();
                                } catch (error) {
                                    console.log(error);
                                }
                            }
                        }}>x</button>
                    </td>
                    </tr> )}) }
        </tbody>
        </table>
        </div>
            <Compose username={user.username} receiver={state}/>
        </section>
  )
}