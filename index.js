const moment = require('moment');
const simpleGit = require('simple-git');
const fs = require('fs');

const FILE_PATH = "./data.txt";

// Create an instance of simpleGit
const git = simpleGit();

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function makeCommit(n) {
    if (n === 0) {
        // git.push();
        return;
    }
    const x = getRandomInt(0, 54);
    const y = getRandomInt(0, 6);
    const DATE = moment().subtract(1, "y").add(x, "w").add(y, "d").format();

    fs.writeFileSync(FILE_PATH, DATE);
    process.env.GIT_COMMITTER_DATE = DATE;
    process.env.GIT_AUTHOR_DATE = DATE;
    
    await git.add([FILE_PATH]);
    await git.commit(DATE);

    makeCommit(n - 1);
}

// Number of commits
makeCommit(10);
