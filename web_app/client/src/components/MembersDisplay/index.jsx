import './style.css'
import MemberRow from "./memberRow";
import Button from '../Button';
import { useState, useEffect } from 'react';

export default function MembersDisplay(props){
    let [checkedUsers, setCheckedState] = useState(
        new Array(props.rows.length).fill(false)
    );
    let [selectedCount, setSelectedCount] = useState(0);

    useEffect(()=>{
        setCheckedState(new Array(props.rows.length).fill(false));
    }, [props.rows])


    const onChange = (position)=>{
        checkedUsers[position] = !checkedUsers[position];
        if(checkedUsers[position]) setSelectedCount(++selectedCount);
        else setSelectedCount(--selectedCount);

        setCheckedState(checkedUsers)
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
                            return <MemberRow modalController={props.modalController} checked={checkedUsers[index]} key={index} onChange={()=>{
                                onChange(index);
                            }} {...row} />;
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}