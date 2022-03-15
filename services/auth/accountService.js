import { auth } from './../../configInit';
import { 
  updatePassword
} from 'firebase/auth';
import { FirebaseError } from '@firebase/util';
import { 
  linkPhoneToEmail,
    setPathValues
} from '../firestore/userFuncs';
import { CurrentUser } from '../../utils/user';
import { ErrorCodes } from '../../const/errorCodes';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from './../../configInit';
import { registerForPushNotificationsAsync } from '../Notification';

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

  phone = phone.replace(/\n/g, '');
  phone = phone.replace(/ /g, '');

  if(phone.startsWith('+')) phone = phone.substr(1);
  if(phone.length == 11){
    if(phone.startsWith('216')) phone = phone.substr(3);
    else {
      if(phone.search(new RegExp('^[0-9]{1,}$'))) // Just numbers
      throw new FirebaseError(ErrorCodes.INVALID_PHONE_NUMBER[0], ErrorCodes.INVALID_PHONE_NUMBER[1]);
    }
  }

  if(phone.search(new RegExp('^[1-9]{1}[0-9]{7}$')) == -1)
    throw new FirebaseError(ErrorCodes.INVALID_PHONE_NUMBER[0], ErrorCodes.INVALID_PHONE_NUMBER[1]);

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