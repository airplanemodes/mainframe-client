import './styles/full-replies.css'

export default function FullReplies(props) {

    // console.log(props.repliesArray);

    return (
        <div id='fullReplies'>
            { props.repliesArray && props.repliesArray.map((element) => {
                return (
                    <article key={element.id} className='singleFullReply'>
                        <div>#{props.repliesArray.indexOf(element) + 1} @ {element.username}</div>
                        <div>{element.body}</div>
                    </article>
                )
            })}
        </div>
    );
};