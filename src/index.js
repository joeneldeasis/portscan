const evilscan = require('evilscan');
const minimist = require('minimist');

let args = minimist(process.argv.slice(2));

let options = {
    target: args.host,
    port: args.port.toString(),
    status: 'TROU',
    banner: false
};

let results = [];

if(args.host == true || args.port == true) {
    console.log(`Usage:\n`);
    console.log(`node src/index.js --host example.com --port 21,22,80,8080`);
    return;
}

new evilscan(options, (error, scan) => {

    if (error) {
        console.log(error);
        return;
    }
    
    scan.on(`result`, (data) => {
        if(data.status == `open`) {
            results.push(data.port)
        }
        console.log(`Scanning ${args.host} port: ${data.port} -> ${data.status}`);
    });

    scan.on(`error`, (error) => {
        throw new Error(data.toString());
    });

    scan.on(`done`, () => {
        console.log(`Done Scanning host: ${args.host}\n`);
        
        if(results.length) {
            console.log(`${results.length} open ports found!`);
            console.log(`Open ports are: ${results}`);
        } 
        
        if(!results.length) {
            console.log(`No open ports found.`);
        }
    });

    scan.run();
});