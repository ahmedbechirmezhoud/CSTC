export function errorHandler(err){
    if(err instanceof FirebaseError){
        switch(err.code){
            case "auth/invalid-email":{
                err.message = ErrorCodes.INVALID_EMAIL[1];
                break;
            }
            case "auth/wrong-password":{
                err.message = ErrorCodes.WRONG_PASSWORD[1];
                break;
            }
            case "auth/network-request-failed":{
                err.message = ErrorCodes.NETWORK_ERROR[1];
                break;
            }
            case "auth/too-many-requests":{
                err.message = ErrorCodes.TOO_MANY_REQUEST[1];
                break;
            }
            case "auth/user-disabled":{
                err.message = ErrorCodes.ACC_DISABLED[1];
                break;
            }
            case "auth/user-not-found":{
                err.message = ErrorCodes.USER_NOT_EXIST[1];
                break;
            }
        }
        throw err;
    }
    throw new FirebaseError(ErrorCodes.UNKNOWN_ERROR[0], ErrorCodes.UNKNOWN_ERROR[1]);
}