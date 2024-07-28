const moment = require('moment');
const simpleGit = require('simple-git');
const fs = require('fs');

const FILE_PATH = "./data.txt";

// Change the number of Commits
const TOTAL_COMMITS = 10;

// 0.8 second delay between commits
const DELAY = 800; 

// Create an instance of simpleGit
const git = simpleGit();

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
    await git.commit(DATE);

    console.log(`✅ ${currentCommit}/${total}: Done`);

    setTimeout(() => makeCommit(n - 1, total), DELAY);
}

// Start the commit process
console.log("🌟 starting...");
makeCommit(TOTAL_COMMITS, TOTAL_COMMITS);
