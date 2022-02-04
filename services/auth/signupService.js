import { auth } from './../../configInit';
import { 
    createUserWithEmailAndPassword, 
    sendEmailVerification,
    User
} from 'firebase/auth';
import { initCurrentUser, linkPhoneToEmail } from '../firestore/userFuncs';
import { CurrentUser } from '../../utils/user';

/**
 * Creates a new user account associated with the specified email address and password.
 * Initializes the Firestore document for the new user.
 * Sends verification email to the user email.
 *
 * @remarks
 * On success, the user will stay signed in.
 * 
 * User account creation can fail if the account already exists or the password is invalid.
 *
 * @param {String} email - The user's email address.
 * @param {String} password - The user's chosen password.
 * 
 * @returns Firebase {@link User}
 * 
 * @public
 */
export async function signUpEmail(email, password) {
  const user = (await createUserWithEmailAndPassword(auth, email, password)).user;
  initCurrentUser(true);

  CurrentUser.loginJson({
    checkedIn: false,
    email: emailSignup,
    votedFor: null,
    uid: user.uid,
    uname: user.displayName,
    email: user.email,
    fbToken: null
  })

  // CurrentUser.login(user.uid, user.displayName, user.email, true, false, null)

  verifyUserEmail(user);
  // await auth.signOut(); // Wait for email verification
  return user;
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
  if(!auth.currentUser) throw new FirebaseError(ErrorCodes.NOT_LOGGED_IN, "Not logged in");

  phone = phone.replace(/\n/g, '');
  phone = phone.replace(/ /g, '');

  if(phone.startsWith('+')) phone = phone.substr(1);
  if(phone.length == 11){
    if(phone.startsWith('216')) phone = phone.substr(3);
    else {
      if(phone.search(new RegExp('^[0-9]{1,}$'))) // Just numbers
        throw new FirebaseError(AuthErrorCodes.INVALID_PHONE_NUMBER, 'Invalid phone number.');
    }
  }

  if(phone.search(new RegExp('^[1-9]{1}[0-9]{7}')) == -1)
    throw new FirebaseError(AuthErrorCodes.INVALID_PHONE_NUMBER, 'Invalid phone number.');

  await linkPhoneToEmail(phone, auth.currentUser.email);
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