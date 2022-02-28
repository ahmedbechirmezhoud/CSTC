import "./style.css";

export default function ModalBtn(props){
    return (
        <div className="modalBtn">
            <button className="m-btn clickable">{props.text}</button>
        </div>
    );
}