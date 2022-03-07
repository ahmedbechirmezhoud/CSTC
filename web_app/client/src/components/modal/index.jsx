import ModalBtn from "./modalBtn";
import "./style.css";

export default function ModalPopup(props){
    console.log(props.users)
    if(props.display){
        const confirmPayment = async () => {
            await fetch(
                "http://localhost:3001/api/changeUserStatus",
                {
                    "method": "POST",
                    "headers": {
                      "Content-Type": "application/json",
                      "accept": "application/json"
                    },
                    "body": JSON.stringify({
                      uid: props.users[0].uid,
                      paid: !props.users[0].paidFee
                    })
                }
            ).then(response => response.json())
            .then(response => {
                if(response.code === 200){
                    // Success
                }
                else console.log(response);
            });

            closeModalDialog();
        }
        const closeModalDialog = () => {
            props.resetCheckbox();
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
                        You're about to mark the following users as <div className={"action " + (props.users[0].paidFee ? "red" : "green")}><b>{props.users[0].paidFee ? "Not paid" : "Paid"}</b></div>, Proceed?
                        <div className="usersListModal">
                            {
                                props.users.map((user, index)=>{
                                    return (
                                        <div key={index} className="userModalLine">
                                            {user.name === "" ? "[!] NOT SET" : user.name} ({user.email} - ID: {user.uid})
                                        </div>
                                    );
                                })
                            }
                        </div>
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