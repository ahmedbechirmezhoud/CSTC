import { auth } from './../../configInit';
import { 
    createUserWithEmailAndPassword, 
    PhoneAuthProvider, 
    linkWithCredential,
    sendEmailVerification
} from 'firebase/auth';
import { initCurrentUser } from '../firestore/userFuncs';

export async function signUpEmail(email, password) {
  console.log('Signup');

  try{
    const user = await createUserWithEmailAndPassword(auth, email, password);
    initCurrentUser();

    verifyUserEmail(auth.currentUser)
  }
  catch(err){
    // TODO : Handle errors
    switch(err.code){
      case "":{
        break;
      }

      default:{
        console.log(err.code);
      }
    }
  }
}

export async function sendVerificationCode(number, verifier){
  const phoneProvider = new PhoneAuthProvider(auth);
  return await phoneProvider.verifyPhoneNumber(number, verifier);
}

export async function addPhoneToCurrentUser(verificationId, code){
  if(!auth.currentUser) return;

  const credential = PhoneAuthProvider.credential(verificationId, code);
  // const userCredential = await signInWithCredential(auth, credential);

  await linkWithCredential(auth.currentUser, credential);
  console.log('Linked!')
}

export async function verifyUserEmail(user){
  await sendEmailVerification(user)
}