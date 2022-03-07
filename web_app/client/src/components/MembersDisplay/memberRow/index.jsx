import './style.css';

export default function MemberRow(props){
    return (
        <tr className='memberRow'>
            <td className='selector'><input type='checkbox' className='clickable' onChange={props.onChange} checked={props.checked}/></td>
            <td className='nameCol'>
                <div>{props.name === "" ? "[!] EMPTY NAME" : props.name}</div>
                <div className='userID'>CIN: {props.cin}</div>
                <div className='userID'>#{props.uid}</div>
            </td>
            <td className='emailCol'>{props.email}</td>
            <td className='paymentOptCol'>{props.payementMethod}</td>
            <td className='statCol'>
                <div 
                    className={"statusDisplay clickable " + (props.paidFee ? "paidStatus" : "notPaidStatus")}
                    onClick={()=>{
                        props.modalController({display: true, users:[props]})
                        
                    }}>
                    {(props.paidFee ? "Paid" : "Not paid")}
                </div>
            </td>
        </tr>
    );
}