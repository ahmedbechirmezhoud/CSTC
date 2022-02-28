const firebaseAdmin = require("firebase-admin");
const express = require("express");

const PORT = process.env.PORT || 3001;
const app = express();

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.applicationDefault()
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

module.exports.app = app;
module.exports.firebaseAdmin = firebaseAdmin;