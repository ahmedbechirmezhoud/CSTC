import { FirebaseError } from 'firebase/app';
import { increment, ref, update } from 'firebase/database';
import { rtdb, auth } from '../../configInit';
import { ErrorCodes } from '../../const/errorCodes';
import {USER_PATH, PART_PATH} from './../../const/firestorePaths';
import { CurrentUser } from '../../utils/user';

/**
 * Adds a vote for the current logged in user, changes the vote if already voted.
 * 
 * @param {String} pID - The participant ID to be voted for
 */
export async function voteForParticipant(pID){
    if(!auth.currentUser) throw new FirebaseError(ErrorCodes.NOT_LOGGED_IN[0], ErrorCodes.NOT_LOGGED_IN[1]);
    (CurrentUser.votedFor === undefined) && (CurrentUser.votedFor = null);
    if(CurrentUser.votedFor === pID) return;

    let refNewPart = ref(rtdb, PART_PATH+pID);
    let userPath = ref(rtdb, USER_PATH+auth.currentUser.uid);

    if(CurrentUser.votedFor != null){ // User is changing vote
        let refOldPart = ref(rtdb, PART_PATH+CurrentUser.votedFor);
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

    console.log("herde");


    await update(userPath, {
        votedFor: CurrentUser.votedFor
    })

    // }).catch((err) => {
    //     console.log(err)
    //     throw new FirebaseError(ErrorCodes.VOTE_ERROR[0], ErrorCodes.VOTE_ERROR[1])
    // })

    
}