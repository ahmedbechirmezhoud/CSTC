import { auth, firestore, rtdb } from './../../configInit'; // Init config
import { setDoc, doc, getDocFromServer, runTransaction, updateDoc, collection, where, query, getDoc, getDocs } from 'firebase/firestore';
import { FirebaseError } from '@firebase/util';
import { ErrorCodes } from '../../const/errorCodes';
import { USER_PATH, PHONE_EMAIL_PATH } from './../../const/firestorePaths';
import { CurrentUser, userData } from '../../utils/user';
import { registerForPushNotificationsAsync } from '../Notification';
import { ref, get } from 'firebase/database';
import { signOut } from '../auth/loginService';


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

    let data = await getPath(USER_PATH+auth.currentUser.uid).catch(
        ()=>{
            signOut();
            throw FirebaseError(ErrorCodes.USER_DATA_NOT_FOUND[0], ErrorCodes.USER_DATA_NOT_FOUND[1])
        }
    );
    data = data.data();
    if(!data) throw FirebaseError(ErrorCodes.USER_DATA_NOT_FOUND[0], ErrorCodes.USER_DATA_NOT_FOUND[1]);

    let phone = await getPath(PHONE_EMAIL_PATH+auth.currentUser.uid).catch(
        ()=>{
            signOut();
            throw FirebaseError(ErrorCodes.USER_DATA_NOT_FOUND[0], ErrorCodes.USER_DATA_NOT_FOUND[1])
        }
    );
    phone = phone.data();
    if(!phone) {
        signOut();
        throw FirebaseError(ErrorCodes.USER_DATA_NOT_FOUND[0], ErrorCodes.USER_DATA_NOT_FOUND[1])
    }
    
    let email = phone.email;
    if(phone.newEmail){
        if(phone.newEmail !== phone.email && auth.currentUser.email === phone.newEmail){
            await updatePathValues(PHONE_EMAIL_PATH+auth.currentUser.uid, {email: phone.newEmail});
            email = phone.newEmail;
        }
    }

    let userPath = ref(rtdb, USER_PATH + auth.currentUser.uid);
    let vote = (await get(userPath));

    if(!vote.exists()) return {...data, votedFor: null, phone: phone.phone, email: email};
    return {data, votedFor: vote.votedFor, phone: phone.phone, email: email};
}

export async function readDataFromPath(path){
    let d = await getPath(path);
    return (d.exists() ? d.data() : null)
}

export async function linkPhoneToEmail(phone){
    //const userDoc = doc(firestore, USER_PATH + auth.currentUser.uid);
    const phoneDoc = doc(firestore, PHONE_EMAIL_PATH + auth.currentUser.uid);

    // Transactions: Do all or nothing
    await runTransaction(firestore, async (transaction)=>{
        //transaction.update(userDoc, {phone: parseInt(phone, 10)});
        transaction.update(phoneDoc, {phone: phone})
        CurrentUser.phone = phone;
    }).catch(()=>{
        throw FirebaseError(ErrorCodes.ERROR_LINK_PHONE[0], ErrorCodes.ERROR_LINK_PHONE[1]);
    })
}

export async function phoneToEmail(number){
    const usersColl = collection(firestore, PHONE_EMAIL_PATH);
    const q1 = query(usersColl, where("phone", "==", number));

    const phoneCheck = await getDocs(q1);

    if(phoneCheck.size == 1) {
        return phoneCheck.docs[0].data().email;
    }
    return null;
}