import "./styles/nopage.css";

export default function NoPage() {
    return (
        <section id="not-found">
            <h1 id="not-found-error">Error 404!</h1>
            <a id="not-found-link" href="/main">Back to main page</a>
        </section>
    );
}