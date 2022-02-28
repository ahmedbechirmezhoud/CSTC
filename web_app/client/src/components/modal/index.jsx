import ModalBtn from "./modalBtn";
import "./style.css";

export default function ModalPopup(props){
    if(props.display){
        const confirmPayment = () => {
            fetch(
                "http://localhost:3001/api/changeUserStatus",
                {
                    "method": "POST",
                    "headers": {
                      "Content-Type": "application/json",
                      "accept": "application/json"
                    },
                    "body": JSON.stringify({
                      uid: props.uid,
                      paid: !props.paidFee
                    })
                }
            ).then(response => response.json())
            .then(response => {
                if(response.code === 200){
                    closeModalDialog();
                    console.log(response);
                }
                else console.log(response);
            })
        }
        const closeModalDialog = () => {
            props.modalController({display: false})
        }
        document.getElementsByTagName('body')[0].style = "overflow: hidden;"
        return (
            <div className="modalContainer" onClick={(e)=>{
                if(e.target.className === "modalContainer"){
                    closeModalDialog();
                }
            }}>
                <div className={"modal " + (props.display ? "visible" : "visible")}>
                    <div className="modalText">
                        You're about to <div className={"action " + (props.paidFee ? "red" : "green")}><b>{props.paidFee ? "cancel" : "confirm"}</b></div> {props.name} ({props.email}) payment.
                        <br/><br/>Proceed?
                    </div>
                    <div className="modalBtns">
                        <ModalBtn action={closeModalDialog} text="Cancel"/>
                        <ModalBtn action={confirmPayment} text="Confirm"/>
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