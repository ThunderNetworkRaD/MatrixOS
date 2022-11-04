const fs = require("fs");
const { exec } = require('child_process');

async function checkModules () {
    return new Promise((resolve, reject) => {
        try {
            var modules = Object.getOwnPropertyNames(require('../package.json').dependencies)
            var toInstall =  '';
            modules.forEach(async (module) => {
                if (!fs.existsSync(`./node_modules/${module}/package.json`)) {
                    //if (version != require(`../node_modules/${module}/package.json`).version) {
                        toInstall += `${module} `;
                    //}
                }
            })
            if (toInstall.length == 0) {
                console.log('All packages are already up to date');
                return resolve('OK');
            }
            console.log('Updating npm modules (' + toInstall + ')')
            exec(`npm i ${toInstall}`, (error, stdout, stderr) => {                                                                            
                if (error) {
                    console.error(`Error: ${error}`);
                    return;
                }
                console.log('Updated all the modules');
                resolve('OK');
                if (stderr != "") console.error(`Error: ${stderr}`);
            });
        } catch (e) {
            console.log(e)
            return reject('error');
        }
    })
}

async function checkUpdate () {
    return new Promise((resolve, reject) => {
        try {
            console.log('Checking on web for the latest version')
            require('./web.js').getJson('https://raw.githubusercontent.com/FIUSdevelopment/MatrixOS/main/package.json')
            .then((response) => {
                
                console.log(`The latest version is ${response.version}\nYou have currently installed ${require('../package.json').version}`);
                if (response.version == require('../package.json').version) {
                    console.log('Your version is up to date');
                    checkModules().then(() => resolve('OK') );
                } else {
                    console.log('Your version is not up to date, Trying to update');
    
                    exec('git pull', (error, stdout, stderr) => {                                                                            
                        if (error) {
                            console.error(`Error: ${error}`);
                            return;
                        }
                        console.log('Updated\nChecking Modules');
                        checkModules().then(() => resolve('OK') );
                        if (stderr != "") console.error(`Error: ${stderr}`);
                    });
                }
            })
        } catch (e) {
            console.log(e)
            return reject('error');
        }
    })
} 


module.exports = checkUpdate;