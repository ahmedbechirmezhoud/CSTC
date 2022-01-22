import { auth } from './../../configInit';
import { 
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    PhoneAuthProvider,
    FacebookAuthProvider,
    signInWithCredential
} from 'firebase/auth';
import * as Facebook from 'expo-facebook';
import { initCurrentUser, isCurrentUserInited } from '../firestore/userFuncs';

export async function signinWithEmail(email, password) {
  try{
    const user = await signInWithEmailAndPassword(auth, email, password);
    
  }
  catch(err){
    console.log("Error: " + err); // TODO : handle errors
  }
}

export function signOut(){
  firebaseSignOut(auth);
}

export async function signinWithFacebook() {
  const provider = new FacebookAuthProvider();

  try {
    const { type, token, expirationDate, permissions, declinedPermissions } =
    await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile', 'email'],
    });
        
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email`);
      console.log('FB Logged in!'); 
      console.log((await response.json())); // User data

      const credential = FacebookAuthProvider.credential(token);
      // Sign in with the credential from the Facebook user.
      await signInWithCredential(auth, credential);

      if(!(await isCurrentUserInited())) initCurrentUser();
    } else {
      // type === 'cancel'
      console.log('Canceled');
    }
    
  } catch ({ message }) {
    // TODO : handle errors
    alert(`Facebook Login Error: ${message}`);
  }
}

export async function signInWithPhone(verificationId, code){
  const credential = PhoneAuthProvider.credential(verificationId, code);
  const user = await signInWithCredential(auth, credential);
}