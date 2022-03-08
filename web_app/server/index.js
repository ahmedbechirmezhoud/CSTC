const { app } = require("./config");
const express = require("express");
const firestore = require('./firestore');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//username and password
const myusername = 'REDACTED'
const mypassword = 'REDACTED'

let authToken = "";

app.post("/api/authAdmin", (req, res) =>{
    if(req.session.userid){
        res.json({ code: 200 })
        return;
    }

    console.log(req.body)

    if(req.body.uname !== myusername || req.body.pass != mypassword){
        res.json({ code: 498, error: "Bad request." })
        return;
    }

    res.setHeader('Access-Control-Allow-Credentials', 'true')
    authToken = Array(125).fill(0).map(x => Math.random().toString(36).charAt(2)).join('');
    console.log("Token: " + authToken);
    req.session.userid = myusername;
    req.session.token = authToken;
    console.log(req.session);

    res.json({ code: 200 });
});

app.get("/api/getUsers", async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true')

    if(!req.session.userid || !req.session.token){
        res.json({code: 499, error: "Not authed"});
        return;
    }
    if(req.session.token !== authToken){
        res.json({code: 498, error: "Not authed"});
        return;
    }

    let page = -1;
    if(req.query.page) page = parseInt(req.query.page, 10);

    try{
        res.json({ code: 200, res: await firestore.getUsers(page) });
    } catch(e){
        console.log(e);
        res.json({ code: 500, error: e});
    }
});

app.post("/api/changeUserStatus", async (req, res)=>{
    if(!req.session.userid){
        res.json({code: 499, error: "Not authed"});
        return;
    }
    if(req.session.token !== authToken){
        res.json({code: 498, error: "Not authed"});
        return;
    }

    // curl "http://localhost:3001/api/changeUserStatus" -d "{\"test\": true}" -H "Content-Type: application/json"
    if(!req.body.uid || req.body.paid === undefined) return res.json({ code: 501, error: "Missing parameters"});

    res.json( await firestore.updateUserPayment(req.body.uid, req.body.paid) );
})

