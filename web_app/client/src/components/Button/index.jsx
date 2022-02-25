import './style.css'
export default function Button(props){
    return (
        <div>
            <button className={'btn ' + (props.clickable ? 'btnClickable clickable' : '')}>{props.text}</button>
        </div>
    );
}