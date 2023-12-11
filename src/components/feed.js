import "./styles/feed.css";
import { axiosRequest, getRequest, serverAddress } from "../services/api";
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
	        let data = await getRequest(serverAddress+"/entries");
	        setEntries(data);
	    } catch (error) {
	        console.log(error);
	    }
    }
  
    const getReplies = async() => {
	    try {
	        let data = await getRequest(serverAddress+"/replies");
	        setReplies(data);
	    } catch (error) {
	        console.log(error);
	    }
    }

    const getCredits = async() => {
	    try {
	        let data = await getRequest(serverAddress+"/credits");
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
            let data = await getRequest(serverAddress+"/entries/node/code");
            setActiveNode("code");
            setEntries(data); 
        } catch (error) {
            console.log(error);
        }
    }

    const setNetworkNode = async() => {
        try {
            let data = await getRequest(serverAddress+"/entries/node/network");
            setActiveNode("network");
            setEntries(data); 
        } catch (error) {
            console.log(error);
        }
    }

    const setHackNode = async() => {
        try {
            let data = await getRequest(serverAddress+"/entries/node/hack");
            setActiveNode("hack");
            setEntries(data);
        } catch (error) {
            console.log(error);
        }
    }

    const setSocietyNode = async() => {
        try {
            let data = await getRequest(serverAddress+"/entries/node/society");
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
            await axiosRequest(serverAddress+"/credits", "POST", creditData);
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
            await axiosRequest(serverAddress+"/credits", "DELETE", creditData);
            getCredits();
        } catch (error) {
            console.log(error);
        }
    }

  
  return (
    <div id="entries-page">
      { /* Node switch buttons */ }
      { /* =================== */ }
      <nav id="node-switch">
        <button className={activeNode === "all" ? "active-node" : "node-button"}
          onClick={setAllNode}>all</button>  
        <button className={activeNode === "code" ? "active-node" : "node-button"}
          onClick={setCodeNode}>code</button>  
        <button className={activeNode === "network" ? "active-node" : "node-button"}
          onClick={setNetworkNode}>network</button>  
        <button className={activeNode === "hack" ? "active-node" : "node-button"}
          onClick={setHackNode}>hack</button>  
        <button className={activeNode === "society" ? "active-node" : "node-button"}
          onClick={setSocietyNode}>society</button>
          { activeNode === "all" && <Pagination urlOfNodeTotal={"/entries/total/all"} /> }
          { activeNode === "code" && <Pagination urlOfNodeTotal={"/entries/total/code"}/> }
          { activeNode === "network" && <Pagination urlOfNodeTotal={"/entries/total/network"}/> }
          { activeNode === "hack" && <Pagination urlOfNodeTotal={"/entries/total/hack"}/> }
          { activeNode === "society" && <Pagination urlOfNodeTotal={"/entries/total/society"}/> }
      </nav>  
      { /* Entries feed */ }
      { /* ============ */ }
      {entries.length === 0 && <div id="no-entries">Node is empty</div>}
      {entries.map((element) => {
        return (
          <article className="element-article" key={element.id}>
            <h2 className="element-title">{element.title}</h2>
            <div className="element-node">@ {element.node}</div>
            <pre className="element-content">{element.content}</pre>
            { props.user === "guest" ? <div className="element-guest-author">{element.author}</div> :
              props.user.username === element.author ? <a className="element-author" href={"/profile"}>
                                                        {element.author}
                                                       </a>
                                                     : <a className="element-author" href={"/users/"+element.author}>
                                                        {element.author}
                                                       </a> }
            { /* Replies */ }
            { props.user !== "guest" && 
                <ShortReplies repliesArray={repliesMap[element.id]} />
            }
            { /* Entry buttons */ }
            <br />
            <div className="feed-buttons">
              <ReadButton id={element.id} />
              { props.user.username === element.author &&
              <EditButton id={element.id} /> }
              { props.user.moderator &&
              <button onClick={async() => {
                  await axiosRequest(serverAddress+"/entries/"+element.id, "DELETE");
                  getEntries();
                }} className="delete-button">Delete</button> }
              { props.user.id ? (
                  creditsMap[element.id] ? (
                    creditsMap[element.id].includes(props.user.id) ?
                      <button className="minus-button" elem={element.id} onClick={applyMinus}>-</button> : 
                      <button className="plus-button" elem={element.id} onClick={applyPlus}>+</button>
                  ) : <button className="plus-button" elem={element.id} onClick={applyPlus}>+</button>
                ) : false }
              { props.user.id ? (
                  creditsMap[element.id] ? <div className="credits-counter">Credits: {creditsMap[element.id].length}</div>
                                         : <div className="credits-counter">Credits: 0</div>
                ) : false }
            </div>
          </article>
        )
      })}
    </div>
  );
}