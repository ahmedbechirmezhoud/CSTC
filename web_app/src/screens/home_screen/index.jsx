import './style.css';
import MembersDisplay from '../../components/MembersDisplay/';
import FilterZone from '../../components/filter_components/';
import { useState, useEffect } from 'react';

export default function HomeScreen(){
    let [searchQuery, setSearchQuery] = useState("");
    let [searchOption, setSearchOption] = useState("-1");

    const arr = [
        {name: "Name", email: "Email", paidFee:true},
        {name: "Name", email: "Email", paidFee:true},
        {name: "Name", email: "Email", paidFee:true},
        {name: "Name", email: "Email", paidFee:false},
        {name: "Name", email: "Email", paidFee:false},
        {name: "Name", email: "Email", paidFee:false},
        {name: "Name", email: "Email", paidFee:false},
        {name: "Name", email: "Email", paidFee:false},
        {name: "NameLol", email: "Email", paidFee:true},
        {name: "Name", email: "Email", paidFee:false},
        {name: "Name", email: "Email", paidFee:false},
        {name: "Name", email: "Email", paidFee:false},
        {name: "Name", email: "Email", paidFee:false},
        {name: "Name", email: "Email", paidFee:false}
    ];

    const [displayMask, setDisplayMask] = useState(new Array(arr.length).fill(true));

    useEffect(()=>{
        let newArr = arr.map((user)=>{
            console.log(searchOption)
            if(searchOption === "-1") return true;
            else if(searchOption === "0"){
                if(user.name.toUpperCase().match(searchQuery.toUpperCase())){
                    return true;
                }
            }
            else if(searchOption === "1"){
                if(user.email.toUpperCase().match(searchQuery.toUpperCase())){
                    return true;
                }
            }
            return false;
        })
        setDisplayMask(newArr);
    }, [searchOption, searchQuery])

    return (
        <div className='homeRoot'>
            <div className='tableTitle'>
                Members list
            </div>
            <FilterZone 
                query={searchQuery} 
                onChangeQuery={setSearchQuery}
                option={searchOption}
                onChangeOption={setSearchOption}
            />

            <MembersDisplay
                query={searchQuery} 
                onChangeQuery={setSearchQuery}
                option={searchOption}
                onChangeOption={setSearchOption}
                rows={arr}
                displayMask={displayMask}
            />
        </div>
    );
}
