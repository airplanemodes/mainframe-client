import "./styles/full-replies.css";

export default function FullReplies(props) {
    return (
        <section id="full-replies">
        { props.repliesArray && props.repliesArray.map((element) => {
            return (
                <article key={element.id} className="single-full-reply">
                    <div>#{props.repliesArray.indexOf(element) + 1} @ <a href={"/users/"+element.username}>{element.username}</a></div>
                    <div>{element.body}</div>
                </article>
            );
        })}
        </section>
    );
}