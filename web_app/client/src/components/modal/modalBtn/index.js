import "./style.css";

export default function ModalBtn(props){
    console.log(props)
    return (
        <div className="modalBtn">
            <button onClick={props.action} className="m-btn clickable">{props.text}</button>
        </div>
    );
}