import { deleteUser } from '@firebase/auth';
import * as authServ from './authService';
import * as dbServ from './../firestore/userFuncs';

describe('Sign up test', ()=>{
    let resUser;

    it('creates a new account', async ()=>{
        resUser = await authServ.signUpEmail('emailer@qa.team', 'hhhhhhhhlklkl')
        expect(resUser).not.toBe(undefined);
    })

    it('checks for firestore user data', async ()=>{
        let data = await dbServ.getCurrentUserData()
        console.log(data);

        expect(data).not.toBe(undefined);

        expect(data.checkedIn).toBe(false);
        expect(data.email).toBe(true);
        expect(data.fbToken).toBe(null);
        expect(data.phone).toBe(null);
    })

    it('removes the account', async ()=>{
        await deleteUser(resUser);
    })
})