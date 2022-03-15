import { auth } from '../../configInit';
import { 
  updatePassword
} from 'firebase/auth';
import { FirebaseError } from '@firebase/util';
import { 
  linkPhoneToEmail,
    phoneToEmail,
    setPathValues
} from '../firestore/userFuncs';
import { CurrentUser } from '../../utils/user';
import { ErrorCodes } from '../../const/errorCodes';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../configInit';
import { registerForPushNotificationsAsync } from '../Notification';
import { isPhoneNumber, isValidPhoneNumber } from '../../utils/verification/phoneNumber';

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

  if(!CurrentUser.emailLogin){
    await setPathValues(
        "users/" + auth.currentUser.uid,
        {
            email: true
        }
    )
    CurrentUser.emailLogin = true;
  }
  return true;
}

/**
 * update current user notification token
 * @param {string} token the token returned by the app
 */
export async function updateNotificationToken(){
  let token = await registerForPushNotificationsAsync();
  await updateDoc(doc(db, "users", CurrentUser.uid), {
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
 * Throws a {@link FirebaseError}) with error code {@link AuthErrorCodes.INVALID_PHONE_NUMBER} 
 * if the given number is invalid.
 * 
 * Throws a {@link FirebaseError}) with error code {@link AuthErrorCodes.PHONE_ALREADY_INUSE} 
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
  await sendEmailVerification(user)
  return true;
}

/**
 * Sends a reset password email to the given email/phone number
 */