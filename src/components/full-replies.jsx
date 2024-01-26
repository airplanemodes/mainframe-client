import "./styles/full-replies.css";

export default function FullReplies({ replies }) {
    return (
        <section id="full-replies">
        { replies && replies.map(r => {
            return (
                <article key={r.id} className="single-full-reply">
                    <div>#{replies.indexOf(r) + 1} @ <a href={"/users/"+r.username}>{r.username}</a></div>
                    <div>{r.body}</div>
                </article>
            );
        })}
        </section>
    );
}
