import { spawn } from 'child_process';

const spawnChildProcess = async (args) => {
    if (!Array.isArray(args)) {
        throw new TypeError('args should be an array');
    }
    
    const child = spawn('node', ['files/script.js', ...args], {
        stdio: [process.stdin, process.stdout, process.stderr, 'ipc']
    });

    child.on('message', (message) => {
        console.log(`Message from child: ${message}`);
    });

    process.on('message', (message) => {
        const result = performCalculation(message);
        child.send(result);
    });
};

const performCalculation = (data) => {
    return `Calculated result for ${data}`;
};

spawnChildProcess(['arg1', 'arg2']);