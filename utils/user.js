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
    notificationToken: null
}

class CurrentUserStructure{
    loginJson(data){
        Object.assign(this, {...userData, ...data});
    }

    logout(){
        Object.assign(this, {...userData});
    }
}

export var CurrentUser = new CurrentUserStructure();
