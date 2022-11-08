import '../styles/read-button.css';

export default function ReadButton(props) {
    return (
        <a href={'/entries/'+props.id}>
            <button className='read-button'>Read</button>
        </a>
    )
}