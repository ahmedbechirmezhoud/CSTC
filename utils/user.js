export class CurrentUser{
    static uid;
    static name;
    static email;
    static emailLogin;
    static checkedIn;
    static fbToken;

    static login(uid, name, email, emailLogin, checkedIn){
        CurrentUser.uid = uid;
        CurrentUser.name = name;
        CurrentUser.email = email;
        CurrentUser.emailLogin = emailLogin;
        CurrentUser.checkedIn = checkedIn;
        CurrentUser.fbToken = null;
    }
}