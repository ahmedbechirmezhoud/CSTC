import './style.css';

export default function MemberRow(props){
    return (
        <tr className='memberRow'>
            <td className='selector'><input type='checkbox' onChange={props.onChange} checked={props.checked}/></td>
            <td className='nameCol'><div>{props.name}</div><div>#12345</div></td>
            <td className='emailCol'>{props.email}</td>
            <td className='statCol'>
                <div className={"statusDisplay clickable " + (props.paidFee ? "paidStatus" : "notPaidStatus")}>
                    {(props.paidFee ? "Paid" : "Not paid")}
                </div>
            </td>
        </tr>
    );
}