import { auth, firestore } from './../../configInit'; // Init config
import { setDoc, doc, getDocFromServer } from 'firebase/firestore';

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
    await setPathValues(
        "users/" + auth.currentUser.uid,
        {
            checkedIn: false,
            email: emailSignup,
            fbToken: fbToken
        }
    )
}

export async function isCurrentUserInited(){
    return (await getPath("users/"+auth.currentUser.uid)).exists()
}

export async function getCurrentUserData(){
    return (await getPath("users/"+auth.currentUser.uid)).data()
}

export async function readDataFromPath(path){
    let d = await getPath(path);
    return (d.exists() ? d.data() : null)
}

export async function linkPhoneToEmail(phone, Email){
    if(phone.startsWith("+")) phone = phone.substr(1);
    if(phone.length == 11 && phone.startsWith('216')) phone = phone.substr(3);

    await setPathValues(
        "phoneNumbers/"+phone,
        {
            email: Email
        }
    )
}

export async function phoneToEmail(number){
    d = await readDataFromPath("phoneNumbers/"+number);
    if(d) return (d.email ? d.email : null);
    return null;
  }