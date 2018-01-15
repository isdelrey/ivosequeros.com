var static = require('node-static');
var fileServer = new static.Server('./out');
require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response);
    }).resume();
}).listen(process.env.PORT || 8000);
console.log("- Serving from localhost:" + (process.env.PORT || 4000));
