import './styles/short-replies.css';

export default function ShortReplies(props) {

  return (
    <div id='replies'>
      { props.repliesArray && props.repliesArray.map((element) => {
        return (
          <article key={element.id} className="singleReply">
            <div>#{props.repliesArray.indexOf(element) + 1} @ {element.username}</div>
            <div>{element.body}</div>
          </article>
        );
      })};
    </div>
  );
};