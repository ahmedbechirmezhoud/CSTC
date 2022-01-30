#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
import SendNotication from './services';

var notification = {};

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
    const spinner = createSpinner('Sending Notification...').start();
    SendNotication(notification)
        .then(() => spinner.success())
        .catch(() => spinner.error())
}


const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

Title();
await sleep();
await getTitle();
await getMessage().then(() => handleAnswer(notification))


