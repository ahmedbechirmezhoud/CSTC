import './style.css';

export default function MemberRow(props){
    const prices = [190, 160, 150, 145]; // 1- 2 - 3 - 4
    const toTitleCase = (ch) => {if(ch) return ch.charAt(0).toUpperCase() + ch.substr(1).toLowerCase(); else return "HERE";}

    return (
        <tr className='memberRow'>
            <td className='selector'><input type='checkbox' className='clickable' onChange={props.onChange} checked={props.checked}/></td>
            <td className='nameCol'>
                <div>{props.name === "" ? "[!] EMPTY NAME" : props.name}</div>
                <div className='userID'>CIN: {props.cin}</div>
                <div className='userID'>#{props.uid}</div>
            </td>
            <td className='emailCol'>{props.email}</td>
            <td className='paymentOptCol'>{toTitleCase(props.payementMethod)}</td>
            <td className='roomCol'>{prices[props.roomType-1]}TND</td>
            <td className='statCol'>
                <div 
                    className={"statusDisplay clickable " + (props.paidFee ? "paidStatus" : "notPaidStatus")}
                    onClick={()=>{
                        props.modalController({display: true, users:[props], resetCheckbox:props.resetCheckbox })
                        
                    }}>
                    {(props.paidFee ? "Paid" : "Not paid")}
                </div>
            </td>
        </tr>
    );
}