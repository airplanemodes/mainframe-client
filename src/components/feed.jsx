import "./styles/feed.css";
import { axiosRequest, getRequest, host } from "../services/api";
import { useEffect, useState } from "react";
import ShortReplies from "./short-replies";
import ReadButton from "./buttons/read-button";
import EditButton from "./buttons/edit-button";
import Pagination from "./pagination";

export default function Feed(props) {

    // console.log(props);

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
  
    // set node buttons
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

    // credit buttons
    const applyPlus = async(event) => {
        try {
            const creditData = {};
            creditData.entryid = event.currentTarget.getAttribute("elem");
            creditData.userid = props.user.id;
            await axiosRequest(host+"/credits", "POST", creditData);
            getCredits();
        } catch (error) {
            console.log(error);
        }
    }

    const applyMinus = async(event) => {
        try {
            const creditData = {};
            creditData.entryid = event.currentTarget.getAttribute("elem");
            creditData.userid = props.user.id;
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
          { activeNode === "all" && <Pagination urlOfNodeTotal={"/entries/total/all"} /> }
          { activeNode === "code" && <Pagination urlOfNodeTotal={"/entries/total/code"}/> }
          { activeNode === "network" && <Pagination urlOfNodeTotal={"/entries/total/network"}/> }
          { activeNode === "hack" && <Pagination urlOfNodeTotal={"/entries/total/hack"}/> }
          { activeNode === "society" && <Pagination urlOfNodeTotal={"/entries/total/society"}/> }
      </nav>  
      { /* Entries feed */ }
      { entries.length === 0 && <div id="node-empty">Node is empty.</div> }
      { entries.map(e => {
        return (
          <article className="element-article" key={e.id}>
            <h2 className="element-title">{ e.title }</h2>
            <div className="element-node">@ { e.node }</div>
            <pre className="element-content">{ e.content }</pre>
            { props.user === "guest" ? 
                <div className="element-guest-author">{ e.author }</div>
                : props.user.username === e.author ? 
                    <a className="element-author" href={"/profile"}>{ e.author }</a>
                    : <a className="element-author" href={"/users/"+e.author}>
                          { e.author }
                      </a> }
            { /* Replies */ }
            { props.user !== "guest" && 
                <ShortReplies repliesArray={repliesMap[e.id]} />
            }
            { /* e buttons */ }
            <br />
            <div className="feed-buttons">
              <ReadButton id={e.id} />
              { props.user.username === e.author &&
              <EditButton id={e.id} /> }
              { props.user.moderator &&
              <button onClick={async() => {
                  await axiosRequest(host+"/entries/"+e.id, "DELETE");
                  getEntries();
                }} className="delete-button">Delete</button> }
              { props.user.id ? (
                  creditsMap[e.id] ? (
                    creditsMap[e.id].includes(props.user.id) ?
                      <button className="minus-button" elem={e.id} onClick={applyMinus}>-</button> : 
                      <button className="plus-button" elem={e.id} onClick={applyPlus}>+</button>
                  ) : <button className="plus-button" elem={e.id} onClick={applyPlus}>+</button>
                ) : false }
              { props.user.id ? (
                  creditsMap[e.id] ? <div className="credits-counter">Credits: { creditsMap[e.id].length }</div>
                                       : <div className="credits-counter">Credits: 0</div>
                ) : false }
            </div>
          </article>
        )
      })}
    </section>
  );
}