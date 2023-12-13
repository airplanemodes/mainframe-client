import { useEffect, useState } from "react";
import { axiosRequest, host } from "../services/api";
import { userdataUpdate } from "../services/userdata";
import Compose from "./compose";
import "./styles/mailbox.css";
import { useLocation } from "react-router-dom";

// TODO: reply button

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
            setPrivateMessages(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        initializeUser();
        getPrivateMessages();
    }, []);

  return (
    <table id="pm-table">
      <tbody>
      <tr>
        <td className="pm-table-td">
          <div id="mailbox">
            <h3>Mailbox</h3>
            <nav>
              <button 
                className={activeBox === "inbox" ? "active-box" : "box-button"}
                onClick={ async() => setActiveBox("inbox") }>Inbox</button>
              <button 
                className={activeBox === "sent" ? "active-box" : "box-button"}
                onClick={ async() => setActiveBox("sent") }>Sent</button>
              <button 
                className={activeBox === "deleted" ? "active-box" : "box-button"}
                onClick={ async() => setActiveBox("deleted") }>Deleted</button>
            </nav>
            <table id="pm-data">
              <thead>
                <tr>
                  { activeBox === "inbox" && <th className="pm-data-heading">From</th> }
                  { activeBox === "sent" && <th className="pm-data-heading">To</th> }
                  { activeBox === "deleted" && <th className="pm-data-heading">Box</th> }
                  { activeBox === "inbox" && <th className="pm-data-heading">Subject</th> }
                  { activeBox === "sent" && <th className="pm-data-heading">Subject</th> }
                  { activeBox === "deleted" && <th className="pm-data-heading">Author</th> }
                  <th className="pm-data-heading">Message</th>
                  { activeBox === "inbox" && <th className="pm-data-heading">Del</th> }
                  { activeBox === "sent" && <th className="pm-data-heading">Del</th> }
                  { activeBox === "deleted" && <th className="pm-data-heading">Recover</th> }
                  { activeBox === "deleted" && <th className="pm-data-heading">Del</th> }
                </tr>
              </thead>
              <tbody>
                { activeBox === "inbox" && privateMessages.filter((element) => element.receiver === user.username)
                                                          .filter((element) => element.receiver_del !== true)
                                                          .map((element) => {
                  return (
                    <tr className="pm-data-row" key={element.id}>
                      <td className="pm-data-msg">
                        <a href={"/users/"+element.sender} className="sender-link">{element.sender}</a>
                      </td>
                      { element.subject ? <td className="pm-data-msg-subject">{element.subject}</td>
                                        : <td className="pm-data-msg-subject">...</td>}
                      <td className="pm-data-msg-body">{element.body}</td>
                      <td className="pm-data-msg">
                        <button className="mail-btn" onClick={async() => {
                          try {
                            await axiosRequest(host+"/privates/receiver-del/"+element.id, "PUT", element.id);
                            getPrivateMessages();
                          } catch (error) {
                            console.log(error);
                          }
                          }}>x
                        </button>
                      </td>
                    </tr>
                  )
                }) }
                { activeBox === "sent" && privateMessages.filter((element) => element.sender === user.username)
                                                         .filter((element) => element.sender_del !== true)
                                                         .map((element) => {
                  return (
                    <tr className="pm-data-row" key={element.id}>
                      <td className="pm-data-msg">
                        <a href={"/users/"+element.receiver} className="sender-link">{element.receiver}</a>
                      </td>
                      { element.subject ? <td className="pm-data-msg-subject">{element.subject}</td>
                                        : <td className="pm-data-msg-subject">...</td> }
                      <td className="pm-data-msg-body">{element.body}</td>
                      <td className="pm-data-msg">
                        <button className="mail-btn"
                          onClick={async() => {
                            try {
                              await axiosRequest(host+"/privates/sender-del/"+element.id, "PUT", element.id);
                              getPrivateMessages();
                            } catch (error) {
                              console.log(error);
                            }
                          }}>x
                        </button>
                      </td>
                    </tr>
                  )
                })}
                { activeBox === "deleted" && privateMessages.filter((element) => element.sender === user.username || element.receiver === user.username)
                                                            .filter((element) => (element.sender === user.username && element.sender_full_del !== true) || (element.receiver === user.username && element.receiver_full_del !== true))
                                                            .filter((element) => (element.sender === user.username && element.sender_del === true) || (element.receiver === user.username && element.receiver_del === true))
                                                            .map((element) => {
                  return (
                    <tr className="pm-data-row" key={element.id}>
                      { element.sender === user.username ? <td className="pm-data-msg">Sent</td>
                                                         : <td className="pm-data-msg">Inbox</td> }
                      { element.receiver === user.username && <td className="pm-data-msg">{element.sender}</td> }
                      { element.sender === user.username && <td className="pm-data-msg">{element.sender}</td> }
                      <td className="pm-data-msg-body">{element.body}</td>
                      <td className="pm-data-msg">
                        <button className="mail-btn" onClick={async() => {
                          if (element.sender === user.username) {
                            try {
                              await axiosRequest(host+"/privates/sender-rec/"+element.id, "PUT", element.id);
                              getPrivateMessages();
                            } catch (error) {
                              console.log(error);
                            }
                          } else {
                            try {
                              await axiosRequest(host+"/privates/receiver-rec/"+element.id, "PUT", element.id);
                              getPrivateMessages();
                            } catch (error) {
                              console.log(error);
                            }
                          }
                        }}>R</button>
                      </td>
                      <td className="pm-data-msg">
                        <button className="mail-btn" onClick={async() => {
                            if (element.sender === user.username) {
                              try {
                                await axiosRequest(host+"/privates/sender-fulldel/"+element.id, "PUT", element.id);
                                getPrivateMessages();
                              } catch (error) {
                                console.log(error);
                              }
                            } else {
                              try {
                                await axiosRequest(host+"/privates/receiver-fulldel/"+element.id, "PUT", element.id);
                                getPrivateMessages();
                              } catch (error) {
                                console.log(error);
                              }
                            }
                          }}>x
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </td>
        <td className="pm-table-td"><Compose username={user.username} receiver={state}/></td>
      </tr>
      </tbody>
    </table>
  )
}