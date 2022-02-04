export class CurrentUser{
    

    static login(uid, name, email, emailLogin, checkedIn, phone, votedFor){
        CurrentUser.uid = uid;
        CurrentUser.uname = name;
        CurrentUser.email = email;
        CurrentUser.emailLogin = emailLogin;
        CurrentUser.checkedIn = checkedIn;
        CurrentUser.phone = phone;
        CurrentUser.votedFor = votedFor;
        CurrentUser.fbToken = null;
    }

    static loginJson(data){
        Object.assign(CurrentUser, data);
    }
}