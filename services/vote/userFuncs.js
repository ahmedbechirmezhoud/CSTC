import { FirebaseError } from 'firebase/app';
import { increment, ref, onValue, set, runTransaction, get, update, goOnline, goOffline } from 'firebase/database';
import { rtdb, auth } from '../../configInit';
import { ErrorCodes } from '../../const/errorCodes';
import { CurrentUser } from '../../utils/user';
import { updatePathValues } from '../firestore/userFuncs';

/**
 * Adds a vote for the current logged in user, changes the vote if already voted.
 * Removes vote if already voted to pID.
 * 
 * @param {String} pID - The participant ID to be voted for
 */
export async function voteForParticipant(pID){
    //if(!auth.currentUser) throw new FirebaseError(ErrorCodes.NOT_LOGGED_IN, "Not logged in");

    let refNewPart = ref(rtdb, "participants/"+pID);
    
    if(CurrentUser.votedFor != null){
        let refOldPart = ref(rtdb, "participants/"+CurrentUser.votedFor);
        await update(refOldPart, {
            votes: increment(-1)
        })
    }

    if(CurrentUser.votedFor != pID){
        await update(refNewPart, {
            votes: increment(1)
        })
        CurrentUser.votedFor = pID;
    } else {
        CurrentUser.votedFor = null;
    }
    
    updatePathValues("users/" + auth.currentUser.uid, {votedFor: CurrentUser.votedFor});
}