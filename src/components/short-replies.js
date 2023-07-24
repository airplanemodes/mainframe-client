import './styles/short-replies.css';

export default function ShortReplies(props) {

  return (
    <div id='replies'>
      { props.repliesArray && props.repliesArray.map((element) => {
        return (
          <article key={element.id} className='single-reply'>
            <div>#{props.repliesArray.indexOf(element) + 1} @ <a className='short-reply-username' href={'/users/'+element.username}>{element.username}</a></div>
            <div>{element.body}</div>
          </article>
        );
      })}
    </div>
  );
}