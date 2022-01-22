import { auth, firestore } from './../../configInit'; // Init config
import { setDoc, doc, getDocFromServer } from 'firebase/firestore';

export async function initCurrentUser(){
    await setDoc(
        doc(firestore, "users", auth.currentUser.uid),
        {
            checkedIn: false
        }
    )
}

export async function isCurrentUserInited(){
    return (await getDocFromServer(doc(firestore, "users", auth.currentUser.uid))).exists()
}

export async function getCurrentUserData(){
    return (await getDocFromServer(doc(firestore, "users", auth.currentUser.uid))).data()
}