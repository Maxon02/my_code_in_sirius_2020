let http_module = require("http");
const port = 8080;


function parseCookies(request) {
    var list = {},
        rc = request.headers.cookie;
 
    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });
 
    return list;
}

let id = 0;

function HandleRequest(request, response){
	let cookies = parseCookies(request);
	console.log(cookies);
	
	const trackImg = new Buffer('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
	
	if(cookies.server_tracking_id){
		console.log("HAS COOKIE!!!", request.url);
		response.writeHead(200, {
			'Content-Type': 'image/gif',
			'Content-Length': trackImg.length
		});
	}
	else{	
		console.log("NEW COOKIE!!!", request.url);
		response.writeHead(200, {
			'Set-Cookie': 'server_tracking_id=' + id,
			'Content-Type': 'image/gif',
			'Content-Length': trackImg.length
		});
		id++;
	}
	response.end(trackImg);
}

function OnListen(){
	console.log("Server is listening");
}

let server = http_module.createServer(HandleRequest);
server.listen(port, OnListen);
