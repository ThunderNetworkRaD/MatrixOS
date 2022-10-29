const std = require('./std.js');
const security = require('./security.js');
const MapDB = require('@fiusdevelopment/map.db');
const mapdb = new MapDB('credentials.db');

module.exports = async () => {
    console.log('Registration started')
    std.cin('Username:').then((username) => {
        std.cin('Passworld:', true).then((passworld) => {
            std.cin('Decryptation code:', true).then(async (decryptationCode) => {
                await mapdb.set(username, {username, passworld: security.encrypt(passworld, decryptationCode), decryptationCode})
                require('./home.js')();
            })
        })
    })
}