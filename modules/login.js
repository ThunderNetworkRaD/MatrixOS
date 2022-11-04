const std = require('@fiusdevelopment/std');
const security = require('./security.js');
const home = require('./home.js')
const MapDB = require('@fiusdevelopment/map.db');
const mapdb = new MapDB('credentials.db');
const register = require('./register.js');

async function login () {
    //if (mapdb.size() > 0) {        
        std.cin('Username:').then((username) => {
            std.cin('Password:', true).then((password) => {
                std.cin('Decryptation code:', true).then(async (pin) => {
                    const user = await mapdb.get(username);
                    if (!user) {
                        console.log('No User Found')
                        return login()
                    }
                    if (user.decryptationCode === pin) {
                        if (security.decrypt(user.password, pin) == password) {
                            home();
                        } else {
                            console.log('Password not correct');
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