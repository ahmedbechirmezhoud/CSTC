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
  phoneToEmail,
  updatePathValues
} from '../firestore/userFuncs';
import { CurrentUser } from '../../utils/user';
import { ErrorCodes } from '../../const/errorCodes';
import { verifyUserEmail } from '../account/accountService';

import { updateNotificationToken } from '../account/accountService';
import { errorHandler } from '../exceptionHandler';
import { isPhoneNumber, isValidPhoneNumber } from '../../utils/verification/phoneNumber';
import { isValidEmail } from '../../utils/verification/emailAddress';
import { USER_PATH } from "../../const/firestorePaths";

/**
 * Logins a user using an identifier & a password.
 * 
 * @remarks
 * Throws a {@link FirebaseError}) with error code {@link ErrorCodes.INVALID_PHONE_NUMBER} 
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
  if(identifier.length === 0)
    throw new FirebaseError(ErrorCodes.INVALID_EMAIL[0], ErrorCodes.INVALID_EMAIL[1])
  
  if(isPhoneNumber(identifier)){
    const verifier = isValidPhoneNumber(identifier);
    if(verifier[0]){ // Valid
      identifier = await phoneToEmail(verifier[1]);

      if(!identifier) throw new FirebaseError(ErrorCodes.PHONE_DOESNT_EXIST[0], ErrorCodes.PHONE_DOESNT_EXIST[1])
    }
    else throw new FirebaseError(ErrorCodes.INVALID_PHONE_NUMBER[0], ErrorCodes.INVALID_PHONE_NUMBER[1]);
  }
  else{
    if(!isValidEmail(identifier)){
      throw new FirebaseError(ErrorCodes.INVALID_EMAIL[0], ErrorCodes.INVALID_EMAIL[1]);
    }
  }

  return (await signinWithEmail(identifier, password));
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
  const user = (await signInWithEmailAndPassword(auth, email, password).catch(errorHandler)).user;

  userInfo = await getCurrentUserData().catch(errorHandler);

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
  updatePathValues(USER_PATH + auth.currentUser.uid, { notificationToken: null } );
  await firebaseSignOut(auth).catch(errorHandler);
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
  const { type, token, expirationDate, permissions, declinedPermissions } =
  await Facebook.logInWithReadPermissionsAsync({
    permissions: ['public_profile'],
  }).catch(errorHandler);
        
  if (type === 'success') {
    console.log('FB Logged in!'); 

    const credential = FacebookAuthProvider.credential(token);

    // Sign in with the credential from the Facebook user.
    if(!auth.currentUser) {
      await signInWithCredential(auth, credential).catch(errorHandler);      
      if(!(await isCurrentUserInited().catch(errorHandler))){
        await auth.currentUser.delete();
        throw FirebaseError(ErrorCodes.REGISTRATION_DISABLED[0], ErrorCodes.REGISTRATION_DISABLED[1])
      }

      userInfo = await getCurrentUserData().catch(errorHandler);
      CurrentUser.loginJson(
        {
          uid: auth.currentUser.uid, 
          ...userInfo,
          fbToken: token
        }
      );
    }
    else {
      await linkWithCredential(auth.currentUser, credential).catch(errorHandler); // Or link fb account

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