const firebaseAdmin = require("firebase-admin");
const async = require("async");

const firestore = firebaseAdmin.app().firestore();
const auth = firebaseAdmin.app().auth();

const MAX_PER_PAGE = 2;


module.exports.getUsers = async (page) => {
    let usersColl = firestore.collection("users");
    let users = await auth.listUsers(MAX_PER_PAGE);
    while(page != 0){
        users = await auth.listUsers(MAX_PER_PAGE, users.pageToken);
        page--;
    }

    let usersList = {};
    let count = 0;
    for(let i = 0; i < users.users.length; i++){
        const jsonArr = users.users[i].toJSON();
        const data = (await firestore.doc("users/"+jsonArr.uid).get()).data();

        usersList[count++] = {uid: jsonArr.uid, email: jsonArr.email, displayName: jsonArr.displayName ?? "", checkedIn: data.checkedIn}
    }

    return usersList;
};