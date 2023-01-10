import { useEffect, useState } from "react"

export default function Pagination(props) {

  let [ countPages, setCountPages ] = useState(0);

  useEffect(() => {
    setCountPages(props.number);
  }, [])

  return (
    <div>
      Number of entries: { countPages }
    </div>
  )
}