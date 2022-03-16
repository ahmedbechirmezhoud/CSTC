import { FirebaseError } from 'firebase/app';
import { increment, ref, update, get } from 'firebase/database';
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

    let obj = {}
    obj[USER_PATH+auth.currentUser.uid] = {};
    obj[PART_PATH+pID] = {};

    if(CurrentUser.votedFor != null){ // User is changing vote
        obj[PART_PATH+CurrentUser.votedFor] = {};
        obj[PART_PATH+CurrentUser.votedFor].votes = increment(-1);
    }

    obj[PART_PATH+pID].votes = increment(1);

    CurrentUser.votedFor = pID;
    obj[USER_PATH+auth.currentUser.uid].votedFor = CurrentUser.votedFor;

    await update(ref(rtdb), obj)
        .catch((err) => {
            console.log(err)
            throw new FirebaseError(ErrorCodes.VOTE_ERROR[0], ErrorCodes.VOTE_ERROR[1])
        })
}

export async function getParticipantList(){
    if(!auth.currentUser) throw new FirebaseError(ErrorCodes.NOT_LOGGED_IN[0], ErrorCodes.NOT_LOGGED_IN[1]);

    let partPath = ref(rtdb, PART_PATH);
    let data = await get(partPath).catch(()=>{
        throw new FirebaseError(ErrorCodes.UNABLE_TO_FETCH_TEAMS[0], ErrorCodes.UNABLE_TO_FETCH_TEAMS[1]);
    });
    let JSONObj = data.toJSON();

    if(JSONObj){
        return Object.keys(JSONObj);
    }
    return [];
}