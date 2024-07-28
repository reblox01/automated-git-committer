const moment = require('moment');
const simpleGit = require('simple-git');
const fs = require('fs');

const FILE_PATH = "./data.txt";

// Change the number of Commits
const TOTAL_COMMITS = 13;

// 0.9 second delay
const DELAY = 900;

// Create an instance of simpleGit
const git = simpleGit();

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
            
            // Clear the line
            process.stdout.write('\r');
        }
    }, stepTime);
}

async function makeCommit(n, total) {
    if (n === 0) {
        console.log("✅ All the commits have been completed. You can push them now by git push.");
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
    const progressBar = startProgressBar(DELAY, 20); // Update more frequently
    await new Promise(resolve => setTimeout(resolve, DELAY));
    clearInterval(progressBar);
    await git.commit(DATE);

    console.log(`✅ ${currentCommit}/${total}: Done`);

    makeCommit(n - 1, total);
}

// Start the commit process
console.log("🌟 starting...");
makeCommit(TOTAL_COMMITS, TOTAL_COMMITS);