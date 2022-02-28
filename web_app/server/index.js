const { app } = require("./config");
const express = require("express");
const firestore = require('./firestore');

app.get("/api/getUsers", async (req, res) => {
    let page = 0;
    if(req.query.page) page = parseInt(req.query.page, 10);

    try{
        res.json({ code: 200, res: await firestore.getUsers(page) });
    } catch(e){
        res.json({ code: 500, error: e});
    }
});

