import { auth } from './../../configInit';
import { 
  updatePassword
} from 'firebase/auth';
import { FirebaseError } from '@firebase/util';
import { 
    setPathValues
} from '../firestore/userFuncs';
import { CurrentUser } from '../../utils/user';
import { ErrorCodes } from '../../const/errorCodes';

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
  if(!auth.currentUser) throw new FirebaseError(ErrorCodes.NOT_LOGGED_IN, "Not logged in");
  
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