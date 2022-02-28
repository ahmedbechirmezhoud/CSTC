const { app } = require("./config");
const express = require("express");
const firestore = require('./firestore');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/getUsers", async (req, res) => {
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
    // curl "http://localhost:3001/api/changeUserStatus" -d "{\"test\": true}" -H "Content-Type: application/json"
    if(!req.body.uid || !req.body.paid) return res.json({ code: 501, error: "Missing parameters"});

    res.json( await firestore.updateUserPayment(req.body.uid, req.body.paid) );
})

