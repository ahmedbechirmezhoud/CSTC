import './style.css';
import MembersDisplay from '../../components/MembersDisplay/';
import FilterZone from '../../components/filter_components/';
import { useState, useEffect } from 'react';

export default function HomeScreen(){
    let [searchQuery, setSearchQuery] = useState("");
    let [searchOption, setSearchOption] = useState("-1");
    let [usersArr, setUsersArr] = useState([]);

    useEffect(()=>{
        fetch("http://localhost:3001/api/getUsers/")
        .then(response => response.json())
        .then(response => {
            if(response.code === 200){
                let newUsersArr = [];
                let i=0;
                while(response.res[i]){
                    newUsersArr.push(response.res[i]);
                    i++;
                }
                //console.log(newUsersArr);
                setUsersArr(newUsersArr);
                setDisplayMask(new Array(newUsersArr.length).fill(true))
            }
        })
    }, [])

    const [displayMask, setDisplayMask] = useState(new Array(usersArr.length).fill(true));

    useEffect(()=>{
        let newArr = usersArr.map((user)=>{
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
                rows={usersArr}
                displayMask={displayMask}
            />
        </div>
    );
}
