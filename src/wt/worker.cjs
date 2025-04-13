const os = require('os');
const { Worker, isMainThread, parentPort } = require('worker_threads');
const numberOfLogicalCores = os.cpus().length;

// Function to create workers and process data concurrently
const createWorkersAndProcessData = () => {
    const promises = [];

    for (let i = 0; i < numberOfLogicalCores; i++) {
        const worker = new Worker(__filename);
        const numberToSend = 10 + i;

        const promise = new Promise((resolve) => {
            worker.on('message', (data) => {
                resolve({ status: 'resolved', data: data });
            });
            worker.on('error', () => {
                resolve({ status: 'error', data: null });
            });

            worker.postMessage(numberToSend);
        });

        promises.push(promise);
    }

    Promise.all(promises).then((results) => {
        console.log(results);
    });
};

if (isMainThread) {
    createWorkersAndProcessData();
} else {
    // n should be received from main thread
    const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

    // Function to receive data from the main thread
    parentPort.on('message', function(n) {
        const result = nthFibonacci(n);
        sendResult(result);
    });

    const sendResult = (result) => {
        // This function sends the result of nthFibonacci computations to the main thread
        parentPort.postMessage(result);
    };
}