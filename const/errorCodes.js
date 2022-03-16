export const ErrorCodes = {
                    // DO NOT CHANGE CODE
                    // CHANGE MESSAGE ONLY
                    //   CODE                 MESSAGE
    NOT_LOGGED_IN: ["user-not-logged-in", "You are not logged in!"],
    EMAIL_NOT_VERIFIED: ["email-not-verified", 'User email is not verified'],
    FB_LOGIN_CANCEL: ["facebook-login-canceled", "Facebook login canceled by user"],
    PHONE_ALREADY_INUSE: ["phone-already-used", "Phone number is already used."],
    PHONE_DOESNT_EXIST: ["phone-doesn't-exist", "Phone number doesn't exist."],
    INVALID_PHONE_NUMBER: ["invalid-phone-number", 'Invalid phone number.'],
    INVALID_EMAIL: ["invalid-email", "Invalid email address."],
    WRONG_PASSWORD: ["wrong-password", "Wrong password!"],
    NETWORK_ERROR: ["network-request-failed", "Verify your internet connection!"],
    TOO_MANY_REQUEST: ["too-many-requests", "Too many attempts, please try again in few minutes."],
    ACC_DISABLED: ["user-disabled", "Your account has been disabled, contact an administrator."],
    USER_NOT_EXIST: ["user-not-found", "Account not found!"],
    VOTE_ERROR: ["vote-error", "An error has occured while submiting your vote."],
    USER_DATA_NOT_FOUND: ["user-data-not-found", "Unable to fetch your info, please contact an administrator."],
    ERROR_LINK_PHONE: ["link-phone-error", "Unable to link phone number."],
    UNKNOWN_ERROR: ["unknown-error", "An unknown error has occured."]
}