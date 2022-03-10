const firebaseAdmin = require("firebase-admin");
const express = require("express");
const expressSession = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require("cors");

const PORT = process.env.PORT || 3001;
const app = express();

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.applicationDefault()
});

app.use(cors());

app.use(express.static('./client/build'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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
    secret: process.env.COOKIE_SECRET ?? "REDACTED",
    saveUninitialized:true,
    cookie: { 
        maxAge: oneDay,
        sameSite: true
    },
    resave: false
}));

global.app = app;
global.firebaseAdmin = firebaseAdmin;