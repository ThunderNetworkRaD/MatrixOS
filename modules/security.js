var crypto = require('crypto')

function encrypt(decrypted, password){
    var key = crypto.createCipher('aes-128-cbc', password);
    var encrypted = key.update(decrypted, 'utf8', 'hex')
    encrypted += key.final('hex')
    return encrypted;
}

function decrypt(encrypted, password){
    var key = crypto.createDecipher('aes-128-cbc', password);
    var decrypted = key.update(encrypted, 'hex', 'utf8')
    decrypted += key.final('utf8');
   return decrypted;
}

module.exports = {
    encrypt,
    decrypt
}