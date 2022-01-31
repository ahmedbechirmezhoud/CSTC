import { auth } from './../../configInit';
import * as Facebook from 'expo-facebook';
import { FirebaseError } from '@firebase/util';
import { 
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    FacebookAuthProvider,
    signInWithCredential,
    linkWithCredential,
    updateProfile,
    AuthErrorCodes
} from 'firebase/auth';

import { 
  getCurrentUserData,
  initCurrentUser,
  isCurrentUserInited,
  phoneToEmail
} from '../firestore/userFuncs';
import { CurrentUser } from '../../utils/user';
import { ErrorCodes } from '../../const/errorCodes';
import { verifyUserEmail } from './signupService';
import { updateNotificationToken } from './accountService';

export async function loginUser(identifier, password){
  identifier = identifier.replace(/\n/g, '');
  identifier = identifier.replace(/ /g, '');

  if(identifier.startsWith('+')) identifier = identifier.substr(1);
  if(identifier.length == 11){
    if(identifier.startsWith('216')) identifier = identifier.substr(3);
    else {
      if(identifier.search(new RegExp('^[0-9]{1,}$'))) // Just numbers
        throw new FirebaseError(AuthErrorCodes.INVALID_PHONE_NUMBER, 'Phone number doesn\'t exist');
    }
  }

  if(identifier.search(new RegExp('^[1-9]{1}[0-9]{7}')) != -1) identifier = await phoneToEmail(identifier);

  if(identifier) await signinWithEmail(identifier, password);
  else throw new FirebaseError(AuthErrorCodes.INVALID_PHONE_NUMBER, 'Phone number doesn\'t exist')
}

export async function signinWithEmail(email, password) {
  const user = (await signInWithEmailAndPassword(auth, email, password)).user;

  if(!(await isUserVerified(user))) { // Force to verify using phone/FB/Email so don't logout
    verifyUserEmail(user)
    throw new FirebaseError(ErrorCodes.EMAIL_NOT_VERIFIED, 'User email is not verified');
  }

  userInfo = await getCurrentUserData();
  CurrentUser.login(user.uid, user.displayName, user.email, userInfo.email, userInfo.checkIn)
  updateNotificationToken();
}

export async function signOut(){
  await firebaseSignOut(auth);
}

export async function signinWithFacebook() {
  const provider = new FacebookAuthProvider();

  const { type, token, expirationDate, permissions, declinedPermissions } =
  await Facebook.logInWithReadPermissionsAsync({
    permissions: ['public_profile', 'email'],
  });
        
  if (type === 'success') {
    // Get the user's name using Facebook's Graph API
    const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email`);
    const respJson = (await response.json());
    console.log('FB Logged in!'); 
    console.log(respJson); // User data

    const credential = FacebookAuthProvider.credential(token);

    // Sign in with the credential from the Facebook user.
    if(!auth.currentUser) {
      console.log('here')
      await signInWithCredential(auth, credential);      
      if(!(await isCurrentUserInited())) await initCurrentUser(false, token);

      userInfo = await getCurrentUserData();
      CurrentUser.login(auth.currentUser.uid, auth.currentUser.displayName, auth.currentUser.email, userInfo.email, userInfo.checkIn)
      CurrentUser.fbToken = token;
    }
    else {
      await linkWithCredential(auth.currentUser, credential); // Or link fb account

      if(!auth.currentUser.displayName) await updateProfile(auth.currentUser, {displayName: respJson.name});
      CurrentUser.name = response.name;
      CurrentUser.fbToken = token;
    }
    updateNotificationToken();

  } else throw new FirebaseError(ErrorCodes.FB_LOGIN_CANCEL, "Facebook login canceled by user");
}

export async function isUserVerified(user){
  let methods = await fetchSignInMethodsForEmail(auth, user.email)
  
  return (user.emailVerified || user.phoneNumber != null || methods.indexOf("facebook.com") != -1)
}