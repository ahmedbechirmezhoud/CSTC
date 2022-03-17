import { deleteUser } from '@firebase/auth';
import * as authServ from './authService';
import * as dbServ from '../firestore/userFuncs';
import { FirebaseError } from '@firebase/util';
import { ErrorCodes } from '../../const/errorCodes';
import { CurrentUser } from '../../utils/user';

// TODO : This needs to be updates

const EMAIL = 'emailer@qa.team';
const PASS = 'hhhhhhhhlklkl';

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
        expect(CurrentUser.name).toBe(null); // We didn't set it
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
        expect(CurrentUser.name).toBe(null); // We didn't set it
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