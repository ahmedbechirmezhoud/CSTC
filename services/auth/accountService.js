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
}