import { auth } from "../../configInit";
import { ErrorCodes } from "../../const/errorCodes";
import { CurrentUser, userData } from "../../utils/user";
import { updatePathValues } from "../firestore/userFuncs";
import {USER_PATH} from './../../const/firestorePaths';
s
/**
 * Updates user info stored in Firestore.
 * This consumes 1 write only.
 * 
 * @remarks
 * Throws a {@link FirebaseError}) with error code {@link ErrorCodes.NOT_LOGGED_IN} 
 * if no user is logged in.
 * 
 * @param {JSON Object} data :Data to be updated in Firestore, use {@link userData} as a format
 */
export function updateUserInfo(data){
    if(!auth.currentUser) throw new FirebaseError(ErrorCodes.NOT_LOGGED_IN[0], ErrorCodes.NOT_LOGGED_IN[1]);

    updatePathValues(USER_PATH + auth.currentUser.uid, data);
    CurrentUser.updateInfo(data);
}