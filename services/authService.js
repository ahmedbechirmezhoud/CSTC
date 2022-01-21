import { 
    signUpEmail,
    addPhoneToCurrentUser,
    sendVerificationCode
} from './signupService';

import { 
    signinWithEmail,
    signOut,
    signinWithFacebook,
    signInWithPhone
} from './loginService';

import { getAuth } from 'firebase/auth';

export {
    signUpEmail,
    signinWithEmail,
    signOut,
    getAuth,
    signinWithFacebook,
    addPhoneToCurrentUser,
    sendVerificationCode,
    signInWithPhone
};