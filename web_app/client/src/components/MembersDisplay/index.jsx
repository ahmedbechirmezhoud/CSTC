import './style.css'
import MemberRow from "./memberRow";
import { useState } from "react";
import Button from '../Button';

export default function MembersDisplay(props){
    const [checkedUsers, setCheckedState] = useState(
        new Array(props.rows.length).fill(false)
    );

    let [selectedCount, setSelectedCount] = useState(0);

    const onChange = (position)=>{
        const updatedCheckedState = checkedUsers.map((item, index) =>
            index === position ? !item : item
        );
        if(updatedCheckedState[position]) setSelectedCount(++selectedCount);
        else setSelectedCount(--selectedCount);

        setCheckedState(updatedCheckedState)
    }

    const inverseSelected = ()=>{
        const updatedCheckedState = checkedUsers.map((item) =>
            !item
        );
        setCheckedState(updatedCheckedState);
        setSelectedCount(checkedUsers.length - selectedCount);
    }
    return (
        <div className='displayContainer'>
            <div className='selectedDisplay'>
                <div className='container'>
                    {selectedCount} selected user{selectedCount > 1 ? "s" : ""}.
                    <div className='setBtn'>
                        <Button clickable={selectedCount !== 0} text="Mark as paid" />
                    </div>
                </div>
            </div>
            <table>
                <thead>
                    <tr className='tableHeader'>
                        <th><input type="checkbox" onChange={inverseSelected}/></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.rows.map((row, index)=>{
                            if(props.displayMask[index])
                            return <MemberRow checked={checkedUsers[index]} key={index} onChange={()=>{
                                onChange(index);
                            }} {...row} />;
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}