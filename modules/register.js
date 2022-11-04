const std = require('@fiusdevelopment/std');
const security = require('./security.js');
const MapDB = require('@fiusdevelopment/map.db');
const mapdb = new MapDB('credentials.db');

module.exports = async () => {
    console.log('Registration started')
    std.cin('Username:').then((username) => {
        std.cin('Password:', true).then((password) => {
            std.cin('Decryptation code:', true).then(async (decryptationCode) => {
                await mapdb.set(username, {username, password: security.encrypt(password, decryptationCode), decryptationCode})
                require('./home.js')();
            })
        })
    })
}