import './style.css'
import MemberRow from "./memberRow";
import Button from '../Button';
import { useState, useEffect } from 'react';

export default function MembersDisplay(props){
    let [checkedUsers, setCheckedState] = useState(
        new Array(props.rows.length).fill(false)
    );
    let [selectedCount, setSelectedCount] = useState(0);
    let [isInverseChecked, setInverseChecked] = useState(false);

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
        let count = 0;
        const updatedCheckedState = checkedUsers.map((item, ind) =>
            props.displayMask[ind] ? (item ? false : (()=>{count++; return true;})() ) : item
        );
        setCheckedState(updatedCheckedState);
        setSelectedCount(count);
        setInverseChecked(!isInverseChecked);
    }

    const resetCheckbox = ()=>{
        setInverseChecked(false); 
        setSelectedCount(0);
        setCheckedState(new Array(props.rows.length).fill(false));
    };
    return (
        <div className='displayContainer'>
            <div className='selectedDisplay'>
                <div className='container'>
                    {selectedCount} selected
                    <div className='setBtn'>
                        <Button resetCheckbox={resetCheckbox} users={props.rows} checkedUsers={checkedUsers} modalController={props.modalController} clickable={selectedCount !== 0} text="Mark as paid" />
                    </div>
                </div>
            </div>
            <table>
                <thead>
                    <tr className='tableHeader'>
                        <th className='selector'>
                            <div className='checkboxHeader'>
                                Inverse
                                <input checked={isInverseChecked} type="checkbox" className='invcheckbox clickable' onChange={inverseSelected}/>
                            </div>
                        </th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Payment</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.rows.map((row, index)=>{
                            if(props.displayMask[index])
                                return <MemberRow 
                                    modalController={props.modalController} 
                                    checked={checkedUsers[index]} 
                                    key={index} 
                                    onChange={()=>{
                                        onChange(index);
                                    }}
                                    {...row} 
                                />;
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}