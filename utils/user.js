export const userData = {
    address: null,
    birthday: null,
    checkedIn: false,
    cin: null,
    name: null,
    paidFee: false,
    paymentMethod: null,
    phone: null,
    roomMates: null,
    roomType: null,
    university: null,
    votedFor: null,
    message: null,
    notificationToken: null,
    email: null
}

class CurrentUserStructure{
    loginJson(data){
        Object.assign(this, {...userData, ...data});
    }

    logout(){
        Object.assign(this, {...userData});
    }

    updateInfo(data){
        Object.assign(this, data);
    }
}

export var CurrentUser = new CurrentUserStructure();
