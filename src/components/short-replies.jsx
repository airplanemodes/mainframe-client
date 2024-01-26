import "./styles/short-replies.css";

export default function ShortReplies({ replies }) {

    return (
        <div id="short-replies">
            { replies && replies.map(r => {
                return (
                    <article key={r.id} className="short-reply">
                        <div>#{replies.indexOf(r) + 1} @ <a className="short-reply-username" href={"/users/"+r.username}>{r.username}</a></div>
                        <div>{r.body}</div>
                    </article>
                );
            })}
        </div>
    );
}
