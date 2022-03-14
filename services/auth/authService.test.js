import { deleteUser } from '@firebase/auth';
import * as authServ from './authService';
import * as dbServ from '../firestore/userFuncs';
import { FirebaseError } from '@firebase/util';
import { ErrorCodes } from '../../const/errorCodes';
import { CurrentUser } from '../../utils/user';

const EMAIL = 'emailer@qa.team';
const PASS = 'hhhhhhhhlklkl';

describe('Sign up test', ()=>{
    it('creates a new account', async ()=>{
        let resUser = await authServ.signUpEmail(EMAIL, PASS)
        expect(resUser).not.toBe(undefined);
    })

    it('checks for firestore user data', async ()=>{
        let data = await dbServ.getCurrentUserData()

        expect(data).not.toBe(undefined);

        expect(data.checkedIn).toBe(false);
        expect(data.email).toBe(true);
        expect(data.fbToken).toBe(null);
        expect(data.phone).toBe(null);
        expect(data.notificationToken).toBe("TESTING")
    })

    it('Logs the user out', async ()=>{
        await authServ.signOut();

        expect(CurrentUser.uid).toBe(null);
        expect(CurrentUser.uname).toBe(null);
        expect(CurrentUser.emailLogin).toBe(null);
        expect(CurrentUser.checkedIn).toBe(null);
        expect(CurrentUser.phone).toBe(null);
        expect(CurrentUser.fbToken).toBe(null);
        expect(CurrentUser.notificationToken).toBe(null);
    })
})

describe('Email signin test', ()=>{
    it('Logins using signinWithEmail', async ()=>{
        let data = null;

        try{
            data = await authServ.signinWithEmail(EMAIL, PASS);
        } catch(e){
            expect(e).toBeInstanceOf(FirebaseError);
            expect(e.code).toBe(ErrorCodes.EMAIL_NOT_VERIFIED[0])
        }

        expect(data).toBe(null); // No error was thrown? (Acc isn't verified)
        expect(CurrentUser.uid).not.toBe(null);
        expect(CurrentUser.uname).toBe(null); // We didn't set it
        expect(CurrentUser.emailLogin).toBe(true);
        expect(CurrentUser.checkedIn).toBe(false);
        expect(CurrentUser.phone).toBe(null);
        expect(CurrentUser.fbToken).toBe(null);
        expect(CurrentUser.notificationToken).toBe("TESTING");

        await authServ.signOut();
    });

    it('Logins using loginUser', async ()=>{
        let data = null;

        try{
            data = await authServ.loginUser(EMAIL, PASS);
        } catch(e){
            expect(e).toBeInstanceOf(FirebaseError);
            expect(e.code).toBe(ErrorCodes.EMAIL_NOT_VERIFIED[0])
        }

        expect(data).toBe(null); // No error was thrown? (Acc isn't verified)
        expect(CurrentUser.uid).not.toBe(null);
        expect(CurrentUser.uname).toBe(null); // We didn't set it
        expect(CurrentUser.emailLogin).toBe(true);
        expect(CurrentUser.checkedIn).toBe(false);
        expect(CurrentUser.phone).toBe(null);
        expect(CurrentUser.fbToken).toBe(null);
        expect(CurrentUser.notificationToken).toBe("TESTING");
    });
})

describe('Clean up', ()=>{
    it('removes the account', async ()=>{
        await deleteUser(authServ.auth.currentUser);
    })
})