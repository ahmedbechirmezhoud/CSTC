const firebaseAdmin = require("firebase-admin");
const express = require("express");
const expressSession = require('express-session');

const PORT = process.env.PORT || 3001;
const app = express();

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.applicationDefault()
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin,Content-Type, Authorization, x-id, Content-Length, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

const oneDay = 1000 * 60 * 60 * 24;
app.use(expressSession({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { 
        maxAge: oneDay,
        sameSite: true
    },
    resave: false
}));

module.exports.app = app;
module.exports.firebaseAdmin = firebaseAdmin;