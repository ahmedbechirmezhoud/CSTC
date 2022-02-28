const firebaseAdmin = require("firebase-admin");

const firestore = firebaseAdmin.app().firestore();
const auth = firebaseAdmin.app().auth();

const MAX_PER_PAGE = 2;

let usersArray = {};

module.exports.getUsers = async (page) => {
    let users = await auth.listUsers(MAX_PER_PAGE);
    while(page > 0){
        users = await auth.listUsers(MAX_PER_PAGE, users.pageToken);
        page--;
    }

    let usersList = {};
    for(let i = 0; i < users.users.length; i++){
        const jsonArr = users.users[i].toJSON();
        if(!usersArray[jsonArr.uid]){
            console.log("Load")
            const data = (await firestore.doc("users/"+jsonArr.uid).get()).data();
            console.log(jsonArr.uid);
            usersArray[jsonArr.uid] = {
                email: jsonArr.email,
                displayName: jsonArr.displayName ?? "",
                checkedIn: data.checkedIn
            }
        }

        usersList[i] = {uid: jsonArr.uid, ...usersArray[jsonArr.uid]}
    }

    return usersList;
};

module.exports.updateUserPayment = async (uid, paid)=>{
    let userDoc = firestore.doc("users/"+uid);
    if(!((await userDoc.get()).exists)) return {code: 502, error: 'User not found.'};

    if(typeof paid !== "boolean") return {code: 503, error: 'Invalid parameters.'};

    await userDoc.update({checkedIn: paid});

    if(!usersArray[uid]){
        const user = await auth.getUser(uid);
        usersArray[uid] = {
            email: user.email,
            displayName: user.displayName ?? ""
        }
    }
    usersArray[uid].checkedIn = true;
    return {code: 200, res: 'ok'};
}