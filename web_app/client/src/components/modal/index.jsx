import ModalBtn from "./modalBtn";
import "./style.css";

export default function ModalPopup(props){
    if(props.display){
        document.getElementsByTagName('body')[0].style = "overflow: hidden;"
        return (
            <div className="modalContainer" onClick={(e)=>{
                if(e.target.className === "modalContainer"){
                    e.target.className = "modal hidden";
                    props.modalController({display: false})
                }
            }}>
                <div className={"modal " + (props.display ? "visible" : "visible")}>
                    <div className="modalText">
                        You're about to <div className={"action " + (props.paidFee ? "red" : "green")}><b>{props.paidFee ? "cancel" : "confirm"}</b></div> {props.name} ({props.email}) payment.
                        <br/><br/>Proceed?
                    </div>
                    <div className="modalBtns">
                        <ModalBtn text="Cancel"/>
                        <ModalBtn text="Confirm"/>
                    </div>
                </div>
            </div>
        );
    }
    else {
        document.getElementsByTagName('body')[0].style = "overflow: auto;"
        return <></>;
    }
}