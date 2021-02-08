var http = require('http');
var cookie = require('cookie');

http.createServer(function(request, response) {
    console.log(request.headers.cookie);
    var cookies = {};
    if(request.headers.cookie !== undefined) {
        cookies = cookie.parse(request.headers.cookie); //parse는 undefined를 수용하지 못하므로 쿠키가 없을때를 대비하여 if문을 짜준다.
    }
    console.log(cookies.yummy_cookie);
    response.writeHead(200, {
        'Set-Cookie':['yummy_cookie=choco', 'tasty_cookie=strawberry'] //한번 보내고 주석처리를 해도 request에 쿠키값이 찍혀있다.
    });

    response.end('Cookie!!');
}).listen(3000);