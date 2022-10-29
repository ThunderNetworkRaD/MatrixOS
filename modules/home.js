const std = require('./std.js');
const fs = require("fs");
var colors = require('colors');

async function then () {
    std.cin('MATRIX >'.red)
    .then((cmd) => {
        var commands = fs.readdirSync(process.cwd + '/commands').filter(file => file.endsWith(".js"));
        var status = 0;
        commands.sort()
        commands.forEach((command) => {
            command = require(process.cwd + `/commands/${command}`)
            if (command.name == cmd.toLocaleLowerCase()) {
                status = 1;
                if (command.name == 'help') command.run(commands)
                else command.run();
                if (command.home) then();
            }
        })
        if (status == 0) {
            then();
        }
    })
}

module.exports = async () => {
    require('figlet')('FIUS Development', function(err, fd) {
        require('figlet')('Matrix OS V'+require(process.cwd + '/package.json').version, function(err, mt) {
            console.log(
                '\n',
                //String(fd).brightGreen+'\n',
                String(mt).brightGreen+'\n',
                '————————————————————[Statistics]————————————————————'.brightRed,
                `\nRunning on Node ${process.version} on ${process.platform} ${process.arch}\nStabler Version: ${require(process.cwd + '/package.json').version}\nMemory: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`.gray,
                `\nRun ${'help'.bgWhite.black} to get help`
            );
            
            then();
        })
    })
}