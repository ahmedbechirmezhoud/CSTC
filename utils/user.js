export class CurrentUser{
    static uid;
    static name;
    static email;
    static emailLogin;
    static phone;
    static checkedIn;
    static fbToken;
    static notificationToken;

    static login(uid, uname, email, emailLogin, checkedIn, phone, notifTkn){
        CurrentUser.uid = uid;
        CurrentUser.name = name;
        CurrentUser.email = email;
        CurrentUser.emailLogin = emailLogin;
        CurrentUser.checkedIn = checkedIn;
        CurrentUser.phone = phone;
        CurrentUser.fbToken = null;
        CurrentUser.notificationToken = notifTkn;
    }
}