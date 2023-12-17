import "./styles/feed.css";
import { axiosRequest, getRequest, host } from "../services/api";
import { useEffect, useState } from "react";
import ShortReplies from "./short-replies";
import ReadButton from "./buttons/read-button";
import EditButton from "./buttons/edit-button";
import Pagination from "./pagination";

export default function Feed({ user }) {

    let [ entries, setEntries ] = useState([]);
    let [ replies, setReplies ] = useState([]);
    let [ credits, setCredits ] = useState([]);
    let [ activeNode, setActiveNode ] = useState("all");
  
    const getEntries = async() => {
	    try {
	        let data = await getRequest(host+"/entries");
	        setEntries(data);
	    } catch (error) {
	        console.log(error);
	    }
    }
  
    const getReplies = async() => {
	    try {
	        let data = await getRequest(host+"/replies");
	        setReplies(data);
	    } catch (error) {
	        console.log(error);
	    }
    }

    const getCredits = async() => {
	    try {
	        let data = await getRequest(host+"/credits");
	        setCredits(data);
	    } catch (error) {
	        console.log(error);
	    }
    }

    useEffect(() => {
	    getEntries();
	    getReplies();
	    getCredits();
    }, []);
    

    let repliesMap = {};
    for (let i = 0; i < replies.length; i++)
        repliesMap[replies[i].entryid] = [];

    for (let i = 0; i < replies.length; i++)
        if (repliesMap[replies[i].entryid])
            repliesMap[replies[i].entryid].push(replies[i]);


    let creditsMap = {};
    for (let i = 0; i < credits.length; i++)
        creditsMap[credits[i].entryid] = [];

    for (let i = 0; i < credits.length; i++)
        if (creditsMap[credits[i].entryid])
            creditsMap[credits[i].entryid].push(credits[i].userid);
  
    const setAllNode = async() => {
        try {
            getEntries();
            setActiveNode("all"); 
        } catch (error) {
            console.log(error);
        }
    }

    const setCodeNode = async() => {
        try {
            let data = await getRequest(host+"/entries/node/code");
            setActiveNode("code");
            setEntries(data); 
        } catch (error) {
            console.log(error);
        }
    }

    const setNetworkNode = async() => {
        try {
            let data = await getRequest(host+"/entries/node/network");
            setActiveNode("network");
            setEntries(data); 
        } catch (error) {
            console.log(error);
        }
    }

    const setHackNode = async() => {
        try {
            let data = await getRequest(host+"/entries/node/hack");
            setActiveNode("hack");
            setEntries(data);
        } catch (error) {
            console.log(error);
        }
    }

    const setSocietyNode = async() => {
        try {
            let data = await getRequest(host+"/entries/node/society");
            setEntries(data);
            setActiveNode("society"); 
        } catch (error) {
            console.log(error);
        }
    }

    const plus = async(event) => {
        try {
            const creditData = {};
            creditData.entryid = event.currentTarget.getAttribute("elem");
            creditData.userid = user.id;
            await axiosRequest(host+"/credits", "POST", creditData);
            getCredits();
        } catch (error) {
            console.log(error);
        }
    }

    const minus = async(event) => {
        try {
            const creditData = {};
            creditData.entryid = event.currentTarget.getAttribute("elem");
            creditData.userid = user.id;
            await axiosRequest(host+"/credits", "DELETE", creditData);
            getCredits();
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <section>
      <nav id="switch">
        <button 
            className={activeNode === "all" ? "active-node" : "node-button"}
            onClick={setAllNode}>all
        </button>  
        <button 
            className={activeNode === "code" ? "active-node" : "node-button"}
            onClick={setCodeNode}>code
        </button>  
        <button 
            className={activeNode === "network" ? "active-node" : "node-button"}
            onClick={setNetworkNode}>network
        </button>  
        <button 
            className={activeNode === "hack" ? "active-node" : "node-button"}
            onClick={setHackNode}>hack
        </button>  
        <button 
            className={activeNode === "society" ? "active-node" : "node-button"}
            onClick={setSocietyNode}>society
        </button>
          { activeNode === "all" && <Pagination total={"/entries/total/all"} /> }
          { activeNode === "code" && <Pagination total={"/entries/total/code"}/> }
          { activeNode === "network" && <Pagination total={"/entries/total/network"}/> }
          { activeNode === "hack" && <Pagination total={"/entries/total/hack"}/> }
          { activeNode === "society" && <Pagination total={"/entries/total/society"}/> }
      </nav>  
      { /* Entries feed */ }
      { entries.length === 0 && <section id="node-empty">Node is empty.</section> }
      { entries.map(e => {
        return (
          <article className="entry" key={e.id}>
            <h2>{ e.title }</h2>
            <label>@ { e.node }</label>
            <pre>{ e.content }</pre>
            { user === "guest" ? 
                <div className="entry-guest-author">{ e.author }</div>
                : user.username === e.author ? 
                    <a className="entry-author" href={"/profile"}>{ e.author }</a>
                    : <a className="entry-author" href={"/users/"+e.author}>
                          { e.author }
                      </a> }
            { /* Replies */ }
            { user !== "guest" && 
                <ShortReplies replies={repliesMap[e.id]} />
            }
            { /* e buttons */ }
            <br />
            <div className="feed-buttons">
              <ReadButton id={e.id} />
              { user.username === e.author &&
              <EditButton id={e.id} /> }
              { user.moderator &&
              <button onClick={async() => {
                  await axiosRequest(host+"/entries/"+e.id, "DELETE");
                  getEntries();
                }} className="delete-button">Delete</button> }
              { user.id ? (
                  creditsMap[e.id] ? (
                    creditsMap[e.id].includes(user.id) ?
                      <button className="minus-btn" elem={e.id} onClick={minus}>-</button> : 
                      <button className="plus-btn" elem={e.id} onClick={plus}>+</button>
                  ) : <button className="plus-btn" elem={e.id} onClick={plus}>+</button>
                ) : false }
              { user.id ? 
                  (creditsMap[e.id] ? <span className="credits">{ creditsMap[e.id].length }</span>
                                    : <span className="credits">0</span>) : false }
            </div>
          </article>
        )
      })}
    </section>
  );
}