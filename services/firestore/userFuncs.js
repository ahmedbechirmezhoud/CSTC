import { auth, firestore } from './../../configInit'; // Init config
import { setDoc, doc, getDocFromServer, runTransaction, updateDoc, collection, where, query, getDoc, getDocs } from 'firebase/firestore';
import { FirebaseError } from '@firebase/util';
import { ErrorCodes } from '../../const/errorCodes';
import { CurrentUser } from '../../utils/user';
import { registerForPushNotificationsAsync } from '../Notification';


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

export async function initCurrentUser(emailSignup, fbToken=null){
    if(!auth.currentUser) throw new FirebaseError(ErrorCodes.NOT_LOGGED_IN, "No user is logged in.");
    let token = await registerForPushNotificationsAsync();

    await setPathValues(
        "users/" + auth.currentUser.uid,
        {
            checkedIn: false,
            email: emailSignup,
            fbToken: fbToken,
            notificationToken: token,
            votedFor: null,
            email: auth.currentUser.email,
            phone: null
        }
    )
}

export async function isCurrentUserInited(){
    if(!auth.currentUser) throw new FirebaseError(ErrorCodes.NOT_LOGGED_IN, "No user is logged in.");

    return (await getPath("users/"+auth.currentUser.uid)).exists()
}

export async function getCurrentUserData(){
    if(!auth.currentUser) throw new FirebaseError(ErrorCodes.NOT_LOGGED_IN, "No user is logged in.");

    data = (await getPath("users/"+auth.currentUser.uid)).data();
    if(!data) throw FirebaseError(ErrorCodes.UNKNOWN_ERROR, "An unknown error has occured.")

    let phonePath = (await readDataFromPath("emailsToNumber/"+auth.currentUser.email));
    data.phone = (phonePath ? phonePath.phone : null);
  
    return data;
}

export async function readDataFromPath(path){
    let d = await getPath(path);
    return (d.exists() ? d.data() : null)
}

export async function linkPhoneToEmail(phone){
    const userDoc = doc(firestore, "users", auth.currentUser.uid);

    const usersColl = collection(firestore, "users");
    const q1 = query(usersColl, where("phone", "==", phone));

    // Transactions: Do all or nothing
    await runTransaction(firestore, async (transaction)=>{
        const phoneCheck = await getDocs(q1);

        if(phoneCheck.size != 0){
            throw new FirebaseError(ErrorCodes.PHONE_ALREADY_INUSE, "Phone number is already used.")
        }

        transaction.update(userDoc, {phone: phone});
        CurrentUser.phone = phone;
    })
}

export async function phoneToEmail(number){
    const usersColl = collection(firestore, "users");
    const q1 = query(usersColl, where("phone", "==", number));
    const phoneCheck = await getDocs(q1);
    if(phoneCheck.size == 1) return phoneCheck.docs[0].data().email;
    return null;
    
  }