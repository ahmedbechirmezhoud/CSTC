export class CurrentUser{
    static uid;
    static name;
    static email;
    static emailLogin;
    static phone;
    static checkedIn;
    static fbToken;

    static login(uid, uname, email, emailLogin, checkedIn, phone){
        CurrentUser.uid = uid;
        CurrentUser.uname = uname;
        CurrentUser.email = email;
        CurrentUser.emailLogin = emailLogin;
        CurrentUser.checkedIn = checkedIn;
        CurrentUser.phone = phone;
        CurrentUser.fbToken = null;
    }
}