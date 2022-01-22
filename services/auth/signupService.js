import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    PhoneAuthProvider, 
    linkWithCredential,
    sendEmailVerification
} from 'firebase/auth';

export async function signUpEmail(email, password) {
  const auth = getAuth();
  console.log('Signup');

  try{
    const user = await createUserWithEmailAndPassword(auth, email, password);

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
  const auth = getAuth();

  const phoneProvider = new PhoneAuthProvider(auth);
  return await phoneProvider.verifyPhoneNumber(number, verifier);
}

export async function addPhoneToCurrentUser(verificationId, code){
  const auth = getAuth();
  if(!auth.currentUser) return;

  const credential = PhoneAuthProvider.credential(verificationId, code);
  // const userCredential = await signInWithCredential(auth, credential);

  await linkWithCredential(auth.currentUser, credential);
  console.log('Linked!')
}

export async function verifyUserEmail(user){
  await sendEmailVerification(user)
}