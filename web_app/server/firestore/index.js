const firebaseAdmin = require("firebase-admin");

const firestore = firebaseAdmin.app().firestore();
const auth = firebaseAdmin.app().auth();


module.exports.getUsers = () => {
    let users = firestore.collection("users");

    console.log(users)
};