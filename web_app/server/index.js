const { app } = require("./config");
const express = require("express");
const firestore = require('./firestore');

app.get("/api/getUsers", (req, res) => {
    res.json({ code: 200 });
    firestore.getUsers();
});

