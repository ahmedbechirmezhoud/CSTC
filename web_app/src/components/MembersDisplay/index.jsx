import MemberRow from "./memberRow";

export default function MembersDisplay(){
    return (
        <table>
            <th>
                <td>Name</td>
                <td>Email</td>
                <td>Paid?</td>
            </th>
            <tbody>
                <MemberRow />
                <MemberRow />
            </tbody>
        </table>
    );
}