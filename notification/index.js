#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
import SendNotication from './services';
import { getTokens, db } from './db';
import { doc, getDoc } from 'firebase/firestore';

var notification = {};
let segment = "ALL";
let uid ="";

function Title(){
    console.clear();
    figlet("CSTC Notifications", (err, data) => {
        console.log(chalk.blueBright(data));
    })
}


async function getTitle(){
    console.clear()
    const answers = await inquirer.prompt({
        name: 'title',
        type: 'input',
        message : "Enter the Notification Title",
    });

    notification.title = answers.title;
}

async function getSegment(){
    console.clear()
    const answers = await inquirer.prompt({
        name: 'segment',
        type: 'list',
        message : "Enter the Notification Segment",
        default: "ALL",
        choices:["ALL", "STAFF", "UID"]
    });

    segment = answers.segment;
}

async function getUid(){
    console.clear()
    const answers = await inquirer.prompt({
        name: 'uid',
        type: 'input',
        message : "Enter the Participant UID",
    });

    uid = answers.uid;
}

async function getMessage(){
    console.clear()
    const answers = await inquirer.prompt({
        name: 'body',
        type: 'input',
        message : "Enter the Notification content",
    });

    notification.body = answers.body;
}

async function handleAnswer(notification){
    if(segment === "UID"){
        getUid().then(() => {
            const spinner = createSpinner('Sending Notification...').start();
            db.collection("users").doc(uid).get().then(v => {
                SendNotication(notification, [v.data().notificationToken]).then(() => spinner.success())
                .catch(() => spinner.error())
            }) 
        })
    }else{
        const spinner = createSpinner('Sending Notification...').start();
        SendNotication(notification,
             await getTokens(segment)
             )
            .then(() => spinner.success())
            .catch(() => spinner.error())    
    }
}


const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

Title();
await sleep();
await getTitle();
await getSegment();
await getMessage().then(() => handleAnswer(notification))


