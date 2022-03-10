import './style.css';
import MembersDisplay from '../../components/MembersDisplay/';
import FilterZone from '../../components/filter_components/';
import { useState, useEffect } from 'react';
import ModalPopup from '../../components/modal';

export default function HomeScreen(props){
    let [searchQuery, setSearchQuery] = useState("");
    let [searchOption, setSearchOption] = useState("-1");
    let [usersArr, setUsersArr] = useState(
        [   
            /* 
            {
                name: "hifff", 
                uid: "123", 
                email: "test@gmail.com", 
                paidFee: false, 
                cin: "12345678",
                roomType: 3
            } 
            */
        ]
    );
    let [modalData, setModalData] = useState({display: false});
    let [displayMask, setDisplayMask] = useState(new Array(usersArr.length).fill(true));

    const signOut = async ()=>{
        await fetch("/api/signout", {credentials: 'include'});
        props.loginState(false);
    }

    useEffect(()=>{
        fetch("/api/getUsers/", {credentials: 'include'})
        .then(response => response.json())
        .then(response => {
            if(response.code === 200){
                let newUsersArr = [];
                let i=0;
                while(response.res[i]){
                    newUsersArr.push(response.res[i]);
                    i++;
                }
                setUsersArr(newUsersArr);
                setDisplayMask(new Array(newUsersArr.length).fill(true))
            } else if(response.code === 499 || response.code === 498){
                return;
            }
        })
    }, [modalData])

    useEffect(()=>{
        let newArr = usersArr.map((user)=>{
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
            else if(searchOption === "2"){
                if(user.cin.toUpperCase().match(searchQuery.toUpperCase())){
                    return true;
                }
            }
            return false;
        })
        setDisplayMask(newArr);
    }, [searchOption, searchQuery])

    return (
        <>
        <ModalPopup modalController={setModalData} {...modalData} />
        <div className='homeRoot'>
            <div className='tableTitle'>
                <div></div>
                <div>Members List</div>
                <button onClick={signOut} className='clickable signoutButton'>Signout</button>
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
                modalController={setModalData}
            />
        </div>
        </>);
}
