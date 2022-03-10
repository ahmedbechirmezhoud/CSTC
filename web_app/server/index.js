require("./config");
require('./auth');

const firestore = require('./firestore');
const path = require('path');
const log = require('./log');
const requestIp = require('request-ip');

const app = global.app;

app.get("/api/getUsers", async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true')

    if(!req.session.userid || !req.session || !req.session.token){
        var clientIp = requestIp.getClientIp(req);
        log.logEvent(clientIp, "Get users", 2, "No session");

        res.json({code: 499, error: "Not authed"});
        return;
    }
    if(req.session.token !== global.authToken){
        var clientIp = requestIp.getClientIp(req);
        log.logEvent(clientIp, "Get users", 2, "Invalid token");

        res.json({code: 498, error: "Not authed"});
        return;
    }

    let page = -1;
    if(req.query.page) page = parseInt(req.query.page, 10);

    try{
        res.json({ code: 200, res: await firestore.getUsers(page) });
        var clientIp = requestIp.getClientIp(req);
        log.logEvent(clientIp, "Get users", level=1);

    } catch(e){
        console.log(e);
        log.logEvent(clientIp, "Get users", 2, e);
        res.json({ code: 500, error: e});
    }
});

app.get("/api/getLogs", async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true')

    if(!req.session.userid || !req.session || !req.session.token){
        var clientIp = requestIp.getClientIp(req);
        log.logEvent(clientIp, "View logs", 2, "No session");

        res.json({code: 499, error: "Not authed"});
        return;
    }
    if(req.session.token !== global.authToken){
        var clientIp = requestIp.getClientIp(req);
        log.logEvent(clientIp, "View logs", 2, "Invalid token");

        res.json({code: 498, error: "Not authed"});
        return;
    }

    res.json({code: 200, res: log.getLogs()});

    var clientIp = requestIp.getClientIp(req);
    log.logEvent(clientIp, "View logs", 0);
});

app.post("/api/changeUserStatus", async (req, res)=>{
    if(!req.session.userid || !req.session || !req.session.token){
        var clientIp = requestIp.getClientIp(req);
        log.logEvent(clientIp, "Change user status", 2, "No session");

        res.json({code: 499, error: "Not authed"});
        return;
    }
    if(req.session.token !== global.authToken){
        var clientIp = requestIp.getClientIp(req);
        log.logEvent(clientIp, "Change user status", 2, "Invalid token");

        res.json({code: 498, error: "Not authed"});
        return;
    }

    // curl "http://localhost:3001/api/changeUserStatus" -d "{\"test\": true}" -H "Content-Type: application/json"
    if(!req.body.uid || req.body.paid === undefined){
        var clientIp = requestIp.getClientIp(req);
        log.logEvent(clientIp, "Change user status", 2, "Invalid parameters");

        return res.json({ code: 501, error: "Missing parameters"});
    }

    res.json( await firestore.updateUserPayment(req.body.uid, req.body.paid) );
    
    var clientIp = requestIp.getClientIp(req);
    log.logEvent(clientIp, "Change user status", 2, "Change " + req.body.uid + " to " + (req.body.paid ? "paid" : "not paid"));
})

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    var clientIp = requestIp.getClientIp(req);
    log.logEvent(clientIp, "Page visit");
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
  });
  // --------------------------------