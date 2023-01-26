import './styles/nopage.css';

export default function NoPage() {
  return (
    <div id='not-found-div'>
      <div id='not-found-error'>Error 404!</div>
      <a id='not-found-link' href='/main'>Back to main page</a>
    </div>
  );
}