const moment = require('moment');
const simpleGit = require('simple-git');
const fs = require('fs');
const readline = require('readline');

const FILE_PATH = "./data.txt";
const DELAY = 900;
const WIDTH = 80;

// ANSI escape codes for colors
const GREEN = '\x1b[32m';
const RESET = '\x1b[0m';

// GitHub repository URL
const GITHUB_URL = 'https://github.com/reblox01/automated-git-committer.git';

// Create an instance of simpleGit
const git = simpleGit();

// Function to display ASCII art and title
function displayAsciiArt() {
    const asciiArt = `
${GREEN}                _         _____                          _ _   _            
     /\\        | |       / ____|                        (_) | | |           
    /  \\  _   _| |_ ___ | |     ___  _ __ ___  _ __ ___  _| |_| |_ ___ _ __ 
   / /\\ \\| | | | __/ _ \\| |    / _ \\| '_ \` _ \\| '_ \` _ \\| | __| __/ _ \\ '__|
  / ____ \\ |_| | || (_) | |___| (_) | | | | | | | | | | | | |_| ||  __/ |   
 /_/    \\_\\__,_|\__\\___/ \\_____\\___/|_| |_| |_|_| |_| |_|_|\__|\__\\___|_|   
    ${RESET}`;

    const title = `${GREEN}Automated Git Committer${RESET}`;
    const underline = '='.repeat(title.length);
    const centeredTitle = centerText(title, WIDTH);
    const centeredUnderline = centerText(`${GREEN}${underline}${RESET}`, WIDTH);
    const centeredGithub = centerText(`${GREEN}Github:${RESET} ${GITHUB_URL}`, WIDTH);

    console.log(`${asciiArt}\n\n${centeredTitle}\n${centeredUnderline}\n${centeredGithub}\n\n\n`);
    askUserForCommits();
}

function centerText(text, width) {
    const padding = Math.max(0, Math.floor((width - text.length) / 2));
    return ' '.repeat(padding) + text;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startProgressBar(totalTime, stepTime) {
    const totalSteps = Math.floor(totalTime / stepTime);
    let currentStep = 0;
    return setInterval(() => {
        currentStep++;
        const percentage = Math.min(Math.floor((currentStep / totalSteps) * 100), 100);
        const progress = '='.repeat(Math.floor((percentage / 100) * 50)) + ' '.repeat(50 - Math.floor((percentage / 100) * 50));
        process.stdout.write(`\r[${progress}] ${percentage}%`);
        if (currentStep >= totalSteps) {
            clearInterval(this);
            process.stdout.write('\r');
        }
    }, stepTime);
}

async function makeCommit(n, total) {
    if (n === 0) {
        console.log(`${GREEN}✅ All the commits have been completed. You can push them now by git push.${RESET}`);
        promptRestart();
        return;
    }

    const currentCommit = total - n + 1;
    console.log(`\n🚀 ${currentCommit}/${total}: generating...`);

    const x = getRandomInt(0, 54);
    const y = getRandomInt(0, 6);
    const DATE = moment().subtract(1, "y").add(x, "w").add(y, "d").format();

    fs.writeFileSync(FILE_PATH, DATE);
    process.env.GIT_COMMITTER_DATE = DATE;
    process.env.GIT_AUTHOR_DATE = DATE;

    console.log(`📂 ${currentCommit}/${total}: adding...`);
    await git.add([FILE_PATH]);

    console.log(`📝 ${currentCommit}/${total}: committing...`);
    const progressBar = startProgressBar(DELAY, 20);
    await new Promise(resolve => setTimeout(resolve, DELAY));
    clearInterval(progressBar);
    await git.commit(DATE);

    console.log(`✅ ${currentCommit}/${total}: Done`);

    makeCommit(n - 1, total);
}

function askUserForCommits() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('How many commits do you want to make? ', (input) => {
        const numCommits = parseInt(input, 10);
        if (isNaN(numCommits) || numCommits <= 0) {
            console.log(`${GREEN}⚠️ Please enter a valid number greater than 0.${RESET}`);
            rl.close();
            askUserForCommits(); // Ask again if the input is invalid
        } else {
            rl.close();
            makeCommit(numCommits, numCommits);
        }
    });
}

function promptRestart() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Want to start another task? (Y/N) ', (answer) => {
        if (['y', 'yes'].includes(answer.toLowerCase())) {
            rl.close();
            console.log(`${GREEN}😃 Restarting...${RESET}\n`);
            askUserForCommits();
        } else if (['n', 'no'].includes(answer.toLowerCase())) {
            console.log(`${GREEN}👋 Exiting...${RESET}`);
            rl.close();
            process.exit(0);
        } else {
            console.log(`${GREEN}⚠️ Please answer with Y or N or YES or NO.${RESET}`);
            rl.close();
            promptRestart(); // Ask again if the input is invalid
        }
    });
}

// Display ASCII Art and title, then ask for the number of commits
displayAsciiArt();
