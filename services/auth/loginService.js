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
    AuthErrorCodes,
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
import { verifyUserEmail } from './signupService';

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

  if(identifier.startsWith('+')) identifier = identifier.substr(1);
  if(identifier.length == 11){
    if(identifier.startsWith('216')) identifier = identifier.substr(3);
    else {
      if(identifier.search(new RegExp('^[0-9]{1,}$'))) // Just numbers
        throw new FirebaseError(AuthErrorCodes.INVALID_PHONE_NUMBER, 'Invalid phone number.');
    }
  }

  if(identifier.search(new RegExp('^[1-9]{1}[0-9]{7}')) != -1) identifier = await phoneToEmail(identifier);

  if(identifier) return (await signinWithEmail(identifier, password));
  else throw new FirebaseError(ErrorCodes.PHONE_DOESNT_EXIST, 'Phone number doesn\'t exist.')
}

/**
 * Logins a user using an email & a password
 * 
 * @remarks
 * Throws a {@link FirebaseError}) with error code {@link ErrorCodes.EMAIL_NOT_VERIFIED} 
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
  const user = (await signInWithEmailAndPassword(auth, email, password)).user;

  userInfo = await getCurrentUserData();
  CurrentUser.login(user.uid, user.displayName, user.email, userInfo.email, userInfo.checkedIn, userInfo.phone)

  updateNotificationToken();  

  if(!(await isUserVerified(user))) { // Force to verify using phone/FB/Email so don't logout
    verifyUserEmail(user)
    throw new FirebaseError(ErrorCodes.EMAIL_NOT_VERIFIED, 'User email is not verified');
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
  CurrentUser.login(null, null, null, null, null, null);
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
      console.log('here')
      await signInWithCredential(auth, credential);      
      if(!(await isCurrentUserInited())) await initCurrentUser(false, token);

      userInfo = await getCurrentUserData();
      CurrentUser.login(auth.currentUser.uid, auth.currentUser.displayName, auth.currentUser.email, userInfo.email, userInfo.checkIn, userInfo.phone)
      CurrentUser.fbToken = token;
    }
    else {
      await linkWithCredential(auth.currentUser, credential); // Or link fb account

      if(!auth.currentUser.displayName) await updateProfile(auth.currentUser, {displayName: respJson.name});
      CurrentUser.uname = response.name;
      CurrentUser.fbToken = token;
    }
    updateNotificationToken();

  } else throw new FirebaseError(ErrorCodes.FB_LOGIN_CANCEL, "Facebook login canceled by user");

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
  
  return (user.emailVerified || methods.indexOf("facebook.com") != -1)
}