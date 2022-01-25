import { auth } from './../../configInit';
import { 
    createUserWithEmailAndPassword, 
    sendEmailVerification
} from 'firebase/auth';
import { initCurrentUser, linkPhoneToEmail } from '../firestore/userFuncs';

export async function signUpEmail(email, password) {
  console.log('Signup');

  const user = await createUserWithEmailAndPassword(auth, email, password);
  initCurrentUser(true);

  await verifyUserEmail(auth.currentUser);
  await auth.signOut(); // Wait for email verification
}

export async function addPhoneToCurrentUser(phone){
  if(!auth.currentUser) throw new FirebaseError(ErrorCodes.NOT_LOGGED_IN, "Not logged in");

  phone = phone.replace(/\n/g, '');
  phone = phone.replace(/ /g, '');

  if(phone.startsWith('+')) phone = phone.substr(1);
  if(phone.length == 11){
    if(phone.startsWith('216')) phone = phone.substr(3);
    else {
      if(phone.search(new RegExp('^[0-9]{1,}$'))) // Just numbers
        throw new FirebaseError(AuthErrorCodes.INVALID_PHONE_NUMBER, 'Invalid phone number.');
    }
  }

  if(phone.search(new RegExp('^[1-9]{1}[0-9]{7}')) == -1)
    throw new FirebaseError(AuthErrorCodes.INVALID_PHONE_NUMBER, 'Invalid phone number.');

  await linkPhoneToEmail(phone, auth.currentUser.email);
  console.log('Linked!')
}

export async function verifyUserEmail(user){
  await sendEmailVerification(user)
}