import { auth } from './../../configInit';
import { 
    createUserWithEmailAndPassword, 
    PhoneAuthProvider, 
    linkWithCredential,
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

export async function sendVerificationCode(number, verifier){ // Phone verif
  const phoneProvider = new PhoneAuthProvider(auth);
  return await phoneProvider.verifyPhoneNumber(number, verifier);
}

export async function addPhoneToCurrentUser(verificationId, code){
  if(!auth.currentUser) throw new FirebaseError(ErrorCodes.NOT_LOGGED_IN, "Not logged in");

  const credential = PhoneAuthProvider.credential(verificationId, code);
  // const userCredential = await signInWithCredential(auth, credential);

  await linkWithCredential(auth.currentUser, credential);
  await linkPhoneToEmail(auth.currentUser.phoneNumber, auth.currentUser.email);

  console.log('Linked!')
}

export async function verifyUserEmail(user){
  await sendEmailVerification(user)
}