import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    PhoneAuthProvider, 
    linkWithCredential 
} from 'firebase/auth';

export async function signUpEmail(email, password) {
  const auth = getAuth();
  console.log('Signup');

  try{
    const user = await createUserWithEmailAndPassword(auth, email, password);
  }
  catch(err){
    // TODO : Handle errors
    console.log(err);
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