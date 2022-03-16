import { auth } from '../../configInit';
import { 
  sendEmailVerification,
  sendPasswordResetEmail,
  updatePassword,
  verifyBeforeUpdateEmail
} from 'firebase/auth';
import { FirebaseError } from '@firebase/util';
import { 
  linkPhoneToEmail,
    phoneToEmail,
    setPathValues
} from '../firestore/userFuncs';
import { CurrentUser } from '../../utils/user';
import { ErrorCodes } from '../../const/errorCodes';
import {USER_PATH} from './../../const/firestorePaths';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../configInit';
import { registerForPushNotificationsAsync } from '../Notification';
import { isPhoneNumber, isValidPhoneNumber } from '../../utils/verification/phoneNumber';
import { isValidEmail } from '../../utils/verification/emailAddress';
import { errorHandler } from '../exceptionHandler';

/**
 * Changes the current user's password, enables email login for facebook users.
 * 
 * @remark
 * Throws {@link FirebaseError} with error code {@link ErrorCodes.NOT_LOGGED_IN}
 * if no user is logged in.
 * 
 * @param {String} password - New password to use.
 * 
 * @returns {boolean} true on success.
 */
export async function updateUserPassword(password){
  if(!auth.currentUser) throw new FirebaseError(ErrorCodes.NOT_LOGGED_IN[0], ErrorCodes.NOT_LOGGED_IN[1]);
  
  updatePassword(auth.currentUser, password);

  await setPathValues(
    USER_PATH + auth.currentUser.uid,
    {
      email: true
    }
  )
  return true;
}

/**
 * update current user notification token
 * @param {string} token the token returned by the app
 */
export async function updateNotificationToken(){
  let token = await registerForPushNotificationsAsync();
  await updateDoc(doc(db, USER_PATH + CurrentUser.uid), {
    notificationToken: token
  });
  CurrentUser.notificationToken = token;
}

/**
 * Links the given phone number to the current logged in user.
 * 
 * @remarks
 * Throws a {@link FirebaseError}) with error code {@link ErrorCodes.NOT_LOGGED_IN} 
 * if no user is logged in.
 * 
 * Throws a {@link FirebaseError}) with error code {@link ErrorCodes.INVALID_PHONE_NUMBER} 
 * if the given number is invalid.
 * 
 * Throws a {@link FirebaseError}) with error code {@link ErrorCodes.PHONE_ALREADY_INUSE} 
 * if the given number is already used.
 * 
 * A valid phone format: 8 digits phone number, first digit can't be 0 & can have "+216" as a prefix.
 * 
 * @param {String} phone - The phone number to link.
 * 
 * @returns {boolean} true on success.
 * 
 * @public
*/
export async function addPhoneToCurrentUser(phone){
  if(!auth.currentUser) throw new FirebaseError(ErrorCodes.NOT_LOGGED_IN[0], ErrorCodes.NOT_LOGGED_IN[1]);

  if(isPhoneNumber(phone)){
    const verifier = isValidPhoneNumber(phone);
    if(verifier[0]){ // Valid
      identifier = await phoneToEmail(verifier[1]);

      if(identifier !== null)
        throw new FirebaseError(ErrorCodes.PHONE_ALREADY_INUSE[0], ErrorCodes.PHONE_ALREADY_INUSE[1])
    }
    else throw new FirebaseError(ErrorCodes.INVALID_PHONE_NUMBER[0], ErrorCodes.INVALID_PHONE_NUMBER[1]);
  }
  else throw new FirebaseError(ErrorCodes.INVALID_PHONE_NUMBER[0], ErrorCodes.INVALID_PHONE_NUMBER[1]);

  await linkPhoneToEmail(phone);
  console.log('Linked!')
  return true;
}

/**
 * Sends a verification email to the given user.
 * 
 * @param {User} user 
 * 
 * @returns {boolean} true on success.
 */
 export async function verifyUserEmail(user){
  await sendEmailVerification(user).catch(errorHandler);
  return true;
}

/**
 * Sends a reset password email to the given email/phone number.
 * 
 * @remarks
 * Throws a {@link FirebaseError}) with error code {@link ErrorCodes.INVALID_PHONE_NUMBER} 
 * if the given number is invalid.
 * 
 * Throws a {@link FirebaseError}) with error code {@link ErrorCodes.PHONE_DOESNT_EXIST} 
 * if the given number doesn't exist.
 * 
 * Throws a {@link FirebaseError}) with error code {@link ErrorCodes.INVALID_EMAIL} 
 * if the given email is invalid.
 */
export async function resetUserPassword(identifier){
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

  // TODO : Use dynamic links to redirect the code to the app
  // const actionCodeSettings = {
  //      url: 'https://cstc-2a071.web.app',
  //      handleCodeInApp: true
  // };
    
  // Identifier == email now
  await sendPasswordResetEmail(auth, identifier).catch(errorHandler);
}

/**
 * Sends a confirmation email to the new email.
 * If the email is confirmed, it'll be set as a new email.
 * 
 * @remarks
 * Throws a {@link FirebaseError}) with error code {@link ErrorCodes.NOT_LOGGED_IN} 
 * if no user is logged in.
 * 
 * Throws a {@link FirebaseError}) with error code {@link ErrorCodes.INVALID_EMAIL} 
 * if the given email is invalid.
 * 
 * @param {String} newemail : new email to use
 */
export async function changeUserEmail(newemail){
  if(!auth.currentUser) throw new FirebaseError(ErrorCodes.NOT_LOGGED_IN[0], ErrorCodes.NOT_LOGGED_IN[1]);
  if(!isValidEmail(newemail)) throw new FirebaseError(ErrorCodes.INVALID_EMAIL[0], ErrorCodes.INVALID_EMAIL[1]);

  await verifyBeforeUpdateEmail(auth.currentUser, newemail).catch(errorHandler);
}