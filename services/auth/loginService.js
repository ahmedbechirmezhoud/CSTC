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
    fetchSignInMethodsForEmail,
    User
} from 'firebase/auth';

import { 
  getCurrentUserData,
  initCurrentUser,
  isCurrentUserInited,
  phoneToEmail
} from '../firestore/userFuncs';
import { CurrentUser } from '../../utils/user';
import { ErrorCodes } from '../../const/errorCodes';
import { verifyUserEmail } from './accountService';

import { updateNotificationToken } from './accountService';


/**
 * Logins a user using an identifier & a password.
 * 
 * @remarks
 * Throws a {@link FirebaseError}) with error code {@link AuthErrorCodes.INVALID_PHONE_NUMBER} 
 * if the given number is invalid.
 * 
 * Throws a {@link FirebaseError}) with error code {@link ErrorCodes.PHONE_DOESNT_EXIST} 
 * if the given number doesn't exist.
 * 
 * A valid phone format: 8 digits phone number, first digit can't be 0 & can have "+216" as a prefix.
 * 
 * @param {String} identifier - User identifier, can be an email or a phone number
 * @param {String} password - User password
 * 
 * @returns Firebase {@link User}
 * 
 * @public
*/
export async function loginUser(identifier, password){
  identifier = identifier.replace(/\n/g, '');
  identifier = identifier.replace(/ /g, '');
  if(identifier.length === 0)
    throw new FirebaseError(ErrorCodes.INVALID_EMAIL[0], ErrorCodes.INVALID_EMAIL[1])

  if(identifier.startsWith('+')) identifier = identifier.substr(1);
  if(identifier.length == 11){
    if(identifier.startsWith('216')) identifier = identifier.substr(3);
    else {
      if(identifier.search(new RegExp('^[0-9]{1,}$'))) // Just numbers
        throw new FirebaseError(ErrorCodes.INVALID_PHONE_NUMBER[0], ErrorCodes.INVALID_PHONE_NUMBER[1]);
    }
  }

  if(identifier.search(new RegExp('^[0-9]{1,7}$')) != -1) 
    throw new FirebaseError(ErrorCodes.INVALID_PHONE_NUMBER[0], ErrorCodes.INVALID_PHONE_NUMBER[1]);

  if(identifier.search(new RegExp('^[1-9]{1}[0-9]{7}$')) != -1) identifier = await phoneToEmail(identifier);

  if(identifier) return (await signinWithEmail(identifier, password));
  else throw new FirebaseError(ErrorCodes.PHONE_DOESNT_EXIST[0], ErrorCodes.PHONE_DOESNT_EXIST[1])
}

/**
 * Logins a user using an email & a password
 * 
 * @remarks
 * Throws a {@link FirebaseError}
 * if the user hasn't verified his account.
 * The user is not logged out.
 * 
 * @param {String} email - A user's email
 * @param {String} password - A user's password
 * 
 * @returns Firebase {@link User} on success.
 * 
 * @public
*/
export async function signinWithEmail(email, password) {
  const user = (await signInWithEmailAndPassword(auth, email, password).catch((err)=>{
    if(err instanceof FirebaseError){
      switch(err.code){
        case "auth/invalid-email":{
          err.message = ErrorCodes.INVALID_EMAIL[1];
          break;
        }
        case "auth/wrong-password":{
          err.message = ErrorCodes.WRONG_PASSWORD[1];
          break;
        }
        case "auth/network-request-failed":{
          err.message = ErrorCodes.NETWORK_ERROR[1];
          break;
        }
        case "auth/too-many-requests":{
          err.message = ErrorCodes.TOO_MANY_REQUEST[1];
          break;
        }
        case "auth/user-disabled":{
          err.message = ErrorCodes.ACC_DISABLED[1];
          break;
        }
      }
      throw err;
    }
    throw new FirebaseError(ErrorCodes.UNKNOWN_ERROR[0], ErrorCodes.UNKNOWN_ERROR[1]);
  })).user;

  userInfo = await getCurrentUserData();

  CurrentUser.loginJson(
    {
      uid: user.uid, 
      ...userInfo
    }
  );

  updateNotificationToken();  

  if(!(isUserVerified(user))) { // Force to verify using phone/FB/Email so don't logout
    verifyUserEmail(user)
    throw new FirebaseError(ErrorCodes.EMAIL_NOT_VERIFIED[0], ErrorCodes.EMAIL_NOT_VERIFIED[1]);
  }
  return user;

}

/**
 * Signs out the current user.
 * 
 * @returns {boolean} true on success.
 * 
 * @public
 */
export async function signOut(){
  await firebaseSignOut(auth);
  CurrentUser.logout();
  return true;
}

/**
 * Signs in a user if account exists, creates a new account if it doesn't exist.
 * If the user is currently logged in with an email, the facebook account gets
 * linked to the current account.
 * 
 * @remarks
 * Throws a {@link FirebaseError}) with error code {@link ErrorCodes.FB_LOGIN_CANCEL} 
 * if the user canceled the login process.
 * 
 * @returns {boolean} true on success.
 * 
 * @public
 */
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
      await signInWithCredential(auth, credential);      
      if(!(await isCurrentUserInited())) 
        await initCurrentUser({fbToken: token, name:respJson.name});

      userInfo = await getCurrentUserData();
      CurrentUser.loginJson(
        {
          uid: auth.currentUser.uid, 
          ...userInfo,
          fbToken: token
        }
      );
    }
    else {
      await linkWithCredential(auth.currentUser, credential); // Or link fb account

      if(CurrentUser.name !== respJson.name) 
        await updateProfile(auth.currentUser, {displayName: respJson.name});
      CurrentUser.name = respJson.name;
      CurrentUser.fbToken = token;
    }
    updateNotificationToken();

  } else throw new FirebaseError(ErrorCodes.FB_LOGIN_CANCEL[0], ErrorCodes.FB_LOGIN_CANCEL[1]);

  return true;
}

/**
 * @remarks
 * A user is verified if he verified his email OR if he have used facebook to signin.
 * 
 * @param {User} user - A firebase user.
 * 
 * @returns {boolean} - true if user is verified, else false.
 * 
 * @public
 */
export async function isUserVerified(user){
  let methods = await fetchSignInMethodsForEmail(auth, user.email)
  
  return (CurrentUser.paidFee || user.emailVerified || methods.indexOf("facebook.com") != -1)
}