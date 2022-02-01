import { auth, firestore } from './../../configInit'; // Init config
import { setDoc, doc, getDocFromServer, runTransaction } from 'firebase/firestore';
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

export async function initCurrentUser(emailSignup, fbToken=null){
    if(!auth.currentUser) throw new FirebaseError(ErrorCodes.NOT_LOGGED_IN, "No user is logged in.");

    await setPathValues(
        "users/" + auth.currentUser.uid,
        {
            checkedIn: false,
            email: emailSignup,
            fbToken: fbToken,
            notificationToken: await registerForPushNotificationsAsync()
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

    let phonePath = (await readDataFromPath("emailsToNumber/"+auth.currentUser.email));
    data.phone = (phonePath ? phonePath.phone : null);
    
    console.log(data)
    return data;
}

export async function readDataFromPath(path){
    let d = await getPath(path);
    return (d.exists() ? d.data() : null)
}

export async function linkPhoneToEmail(phone, Email){
    const emailDoc = doc(firestore, "phoneNumbers", phone)
    const emailsToNumberDoc = doc(firestore, "emailsToNumber", Email)

    // Transactions: Do all or nothing
    await runTransaction(firestore, async (transaction)=>{
        const emailField = await transaction.get(emailDoc);
        const emailsToNumberField = await transaction.get(emailsToNumberDoc);
        if(emailField.exists()){
            throw new FirebaseError(ErrorCodes.PHONE_ALREADY_INUSE, "Phone number is already used.")
        }

        transaction.set(emailDoc, {email: Email});

        if(emailsToNumberField.exists()) transaction.update(emailsToNumberDoc, phone);
        else transaction.set(emailsToNumberDoc, {phone:phone});

        CurrentUser.phone = phone;
    })
}

export async function phoneToEmail(number){
    d = await readDataFromPath("phoneNumbers/"+number);
    if(d) return (d.email ? d.email : null);
    return null;
  }