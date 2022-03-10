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

global.lockToIP = "";

app.post("/api/authAdmin", (req, res) =>{
    var clientIp = requestIp.getClientIp(req);

    if(req.session.userid){
        log.logEvent(clientIp, "Signin", 1);

        res.json({ code: 200 })
        return;
    }

    if(!req.body.uname || !req.body.pass){
        res.json({ code: 498, error: "Bad request." })
        return;
    }

    if(req.body.uname !== myusername || req.body.pass != mypassword){
        log.logEvent(clientIp, "Signin", 2, "Bad creds: " + req.body.uname + ":" + req.body.pass);

        res.json({ code: 498, error: "Bad request." })
        return;
    }

    res.setHeader('Access-Control-Allow-Credentials', 'true')
    global.lockToIP = clientIp;

    req.session.userid = myusername;

    res.json({ code: 200 });
    
    log.logEvent(clientIp, "Signin", 1);
});

module.exports.isUserAuthed = (log_title, req, res) => {
    var clientIp = requestIp.getClientIp(req);

    if(!req.session.userid || !req.session){
        log.logEvent(clientIp, log_title, 2, "No session");

        res.json({code: 499, error: "Not authed"});
        return false;
    }
    if(clientIp !== global.lockToIP){
        log.logEvent(clientIp, log_title, 2, "Invalid IP (Incomming: " + clientIp + " - Current: " + global.lockToIP);

        res.json({code: 498, error: "Not authed"});
        return false;
    }

    return true;
}