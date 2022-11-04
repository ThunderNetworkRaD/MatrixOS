const std = require('@fiusdevelopment/std');
const security = require('./security.js');
const home = require('./home.js')
const MapDB = require('@fiusdevelopment/map.db');
const mapdb = new MapDB('credentials.db');
const register = require('./register.js');

async function login () {
    //if (mapdb.size() > 0) {        
        std.cin('Username:').then((username) => {
            std.cin('Passworld:', true).then((passworld) => {
                std.cin('Decryptation code:', true).then(async (pin) => {
                    const user = await mapdb.get(username);
                    if (!user.username) {
                        console.log('No User Found')
                        return login()
                    }
                    if (user.decryptationCode === pin) {
                        if (security.decrypt(user.passworld, pin) == passworld) {
                            home();
                        } else {
                            console.log('Passworld not correct');
                            login()
                        }
                    } else {
                        console.log('Decryptation code not correct');
                        login()
                    }
                })
            })
        })
    //} else {
    //    register();
    //}
}

module.exports = login;