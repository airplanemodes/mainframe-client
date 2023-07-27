import '../styles/edit-button.css';

export default function EditButton(props) {
    return (
        <a href={'/edit/'+props.id}>
            <button className='edit-button'>Edit</button>
        </a>
    );
}