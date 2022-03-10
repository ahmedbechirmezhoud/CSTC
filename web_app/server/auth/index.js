const log = require('./../log');
const requestIp = require('request-ip');

const app = global.app;

app.get("/api/signoutd", (req, res) =>{
    req.session.destroy();
    res.json({code: 200, res: "Logged out"})
})

//username and password
const myusername = process.env.LOGIN_USER ?? "REDACTED"
const mypassword = process.env.LOGIN_PASS ?? "REDACTED"

global.authToken = "";

app.post("/api/authAdmin", (req, res) =>{
    if(req.session.userid){
        var clientIp = requestIp.getClientIp(req);
        log.logEvent(clientIp, "Signin", 1);

        res.json({ code: 200 })
        return;
    }

    if(!req.body.uname || !req.body.pass){
        res.json({ code: 498, error: "Bad request." })
        return;
    }

    if(req.body.uname !== myusername || req.body.pass != mypassword){
        var clientIp = requestIp.getClientIp(req);
        log.logEvent(clientIp, "Signin", 2, "Bad creds: " + req.body.uname + ":" + req.body.pass);

        res.json({ code: 498, error: "Bad request." })
        return;
    }

    res.setHeader('Access-Control-Allow-Credentials', 'true')
    global.authToken = Array(125).fill(0).map(x => Math.random().toString(36).charAt(2)).join('');

    req.session.userid = myusername;
    req.session.token = global.authToken;

    res.json({ code: 200 });
    
    var clientIp = requestIp.getClientIp(req);
    log.logEvent(clientIp, "Signin", 1);
});