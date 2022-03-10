const fs = require('fs')

const LOG_NAME = "./log.data"

const getCurrentDate = () => {
    let curDate = new Date();
    return curDate.toLocaleDateString() + " - " + curDate.toLocaleTimeString();
}

const LEVELS = ["NORMAL", "HIGH", "CRITICAL"]

module.exports.logEvent = (ip, event, level=0, comment="")=>{
    fs.appendFile(
        LOG_NAME, 
        "[" + LEVELS[level] + "]" + "[" + getCurrentDate() + "]" + "[" + ip + "] " + event + (comment === "" ? "" : " - " + comment) + "\n",
        (err)=>{console.log("Log error: " + err);}
        );
}

module.exports.getLogs = ()=>{
    let data = fs.readFileSync(LOG_NAME, "utf-8").trim();
    return data.split("\n");
}