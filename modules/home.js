const std = require('@fiusdevelopment/std');
const fs = require("fs");
const colors = require('colors');
const figlet = require('figlet')

async function then() {
    std.cin('MATRIX >'.red)
    .then((cmd) => {
        let status = 0;
        const commands = require('../commands.js')
        commands.forEach((command) => {
            if (command.key.toLocaleLowerCase() == cmd.toLocaleLowerCase()) {
                status = 1;
                if (command.key == 'help') command.value.run(commands)
                else command.value.run();
                if (command.value.home) then();
            }
        })
        if (status == 0) {
            then();
        }
    })
}

module.exports = async () => {
    //figlet('FIUS Development', function(err, fd) {
        figlet('figlet')('Matrix OS V'+require('../package.json').version, function(err, mt) {
            console.log(
                '\n',
                //String(fd).brightGreen+'\n',
                String(mt).brightGreen || 'MatrixOS' + '\n',
                '————————————————————[Statistics]————————————————————'.brightRed,
                `\nRunning on Node ${process.version} on ${process.platform} ${process.arch}\nMatrix Version: ${require('../package.json').version}\nMemory: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`.gray,
                `\nRun ${'help'.bgWhite.black} to get help`
            );
            
            then();
        })
    //})
}