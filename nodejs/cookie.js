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
        'Set-Cookie':[
            'yummy_cookie=choco', 
            'tasty_cookie=strawberry', 
            `Permanent=cookies; Max-Age=${60*60*24*30}` //Max-Age를 이용하여 오래지속되는 쿠키를 만들 수 있다 현재 쓰인 코드는 한달이 만료기간이다. (Max-Age = 쿠키가 얼마동안 살 것인가{'초' 가 들어가야한다}) / (Expires = 쿠키가 언제 죽을[만료될]것인가)
    ] //한번 보내고 주석처리를 해도 request에 쿠키값이 찍혀있다.
    });
    response.end('Cookie!!');
}).listen(3000);
/* 
    웹 브라우저를 끄면 사라지는 휘발성 쿠키 = Session Cookie (일반적인 쿠키)
    웹 브라우저를 꺼도 사라지지 않는 쿠키 = Permanent Cookie (날짜를 지정)
*/
