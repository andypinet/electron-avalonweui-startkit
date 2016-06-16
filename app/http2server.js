var fs = require("fs");
var options = {
    key: fs.readFileSync('./privatekey.pem'),
    cert: fs.readFileSync('./certificate.pem')
};

require('http2').createServer(options, function(request, response) {
    response.end('Hello world!');
}).listen(8080);