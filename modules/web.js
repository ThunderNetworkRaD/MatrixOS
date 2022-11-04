async function getJson (url) {
    return new Promise ((resolve, reject) => {
        require('https').get(url, function(res){
            var body = '';

            res.on('data', function(chunk){
                body += chunk;
            });

            res.on('end', function(){
                var response = JSON.parse(body);
                return resolve(response);
            });
        }).on('error', function(e){
            return reject(e);
        });
    });
};

module.exports = {
    getJson
}