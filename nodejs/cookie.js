var http = require('http');
http.createServer(function(request, response) {
    // response.writeHead(200, {
    //     'Set-Cookie':['yummy_cookie=choco', 'tasty_cookie=strawberry'] 한번 보내고 주석처리를 해도 request에 쿠키값이 찍혀있다.
    // });
    response.end('Cookie!!');
}).listen(3000);