import { auth, firestore, rtdb } from './../../configInit'; // Init config
import { setDoc, doc, getDocFromServer, runTransaction, updateDoc, collection, where, query, getDoc, getDocs } from 'firebase/firestore';
import { FirebaseError } from '@firebase/util';
import { ErrorCodes } from '../../const/errorCodes';
import {USER_PATH} from './../../const/firestorePaths';
import { CurrentUser, userData } from '../../utils/user';
import { registerForPushNotificationsAsync } from '../Notification';
import { ref, get } from 'firebase/database';


export async function getPath(path){
    return (await getDocFromServer(doc(firestore, path)));
}

export async function setPathValues(path, values){
    await setDoc(
        doc(firestore, path),
        values
    )
}

export async function updatePathValues(path, values){
    await updateDoc(
        doc(firestore, path),
        values
    )
}

export async function initCurrentUser(data){
    if(!auth.currentUser) throw new FirebaseError(ErrorCodes.NOT_LOGGED_IN[0], ErrorCodes.NOT_LOGGED_IN[1]);
    let token = await registerForPushNotificationsAsync();

    await setPathValues(
        USER_PATH + auth.currentUser.uid,
        {
            ...userData,
            ...data,
            notificationToken: token
        }
    )
}

export async function isCurrentUserInited(){
    if(!auth.currentUser) throw new FirebaseError(ErrorCodes.NOT_LOGGED_IN[0], ErrorCodes.NOT_LOGGED_IN[1]);

    return (await getPath(USER_PATH+auth.currentUser.uid)).exists()
}

export async function getCurrentUserData(){
    if(!auth.currentUser) throw new FirebaseError(ErrorCodes.NOT_LOGGED_IN[0], ErrorCodes.NOT_LOGGED_IN[1]);

    data = (await getPath(USER_PATH+auth.currentUser.uid)).data();
    if(!data) throw FirebaseError(ErrorCodes.USER_DATA_NOT_FOUND[0], ErrorCodes.USER_DATA_NOT_FOUND[1])

    let userPath = ref(rtdb, USER_PATH + auth.currentUser.uid);
    let vote = (await get(userPath));

    if(!vote.exists()) return {...data, votedFor: null};
    return {data, votedFor: vote.votedFor};
}

export async function readDataFromPath(path){
    let d = await getPath(path);
    return (d.exists() ? d.data() : null)
}

export async function linkPhoneToEmail(phone){
    const userDoc = doc(firestore, USER_PATH + auth.currentUser.uid);

    // Transactions: Do all or nothing
    await runTransaction(firestore, async (transaction)=>{
        transaction.update(userDoc, {phone: phone});
        CurrentUser.phone = phone;
    })
}

export async function phoneToEmail(number){
    const usersColl = collection(firestore, USER_PATH);
    const q1 = query(usersColl, where("phone", "==", parseInt(number, 10)));

    const phoneCheck = await getDocs(q1);

    if(phoneCheck.size == 1) {
        return phoneCheck.docs[0].data().email;
    }
    return null;
    
  }