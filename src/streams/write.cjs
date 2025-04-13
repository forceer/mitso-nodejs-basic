const fs = require('fs');

const write = async () => {
    const writable = fs.createWriteStream('files/fileToWrite.txt');
    process.stdin.pipe(writable);
};


(async () => {
    await write();
})();
