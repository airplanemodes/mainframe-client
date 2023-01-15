import { useEffect, useState } from "react"
import { getRequest, serverAddress } from "../services/api";

export default function Pagination(props) {

  // let entriesPerPage = 2;

  // let [ countPages, setCountPages ] = useState(0);

  const getNodeTotal = async() => {
    let url = serverAddress+props.urlOfNodeTotal;
    // let data = await getRequest(url);
    console.log(url);
  }

  useEffect(() => {
    getNodeTotal();
    // eslint-disable-next-line
  }, []);

  return (
    <nav>
      Pagination will be here.
    </nav>
  )
}