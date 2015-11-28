var http = require('http');
var	url = require('url');
var	request = require('request');


http.createServer(onRequest).listen(3000);
console.log('Proxy running at http://localhost:3000/');
function onRequest(req, res) {
	// adding CORS support
	res.writeHead(200, {'Access-Control-Allow-Origin': '*'});
    var queryData = url.parse(req.url, true).query;
    if (queryData.url) {
        request({
            url: queryData.url

        }).on('error', function(e) {
            res.end(e);
        }).pipe(res);

    }
    else {
        res.end("no rss url found");
    }
}