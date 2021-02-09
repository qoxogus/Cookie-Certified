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
            `Permanent=cookies; Max-Age=${60*60*24*30}`, //Max-Age를 이용하여 오래지속되는 쿠키를 만들 수 있다 현재 쓰인 코드는 한달이 만료기간이다. (Max-Age = 쿠키가 얼마동안 살 것인가{'초' 가 들어가야한다}) / (Expires = 쿠키가 언제 죽을[만료될]것인가)
            'Secure=Secure; Secure',                     //https 를 사용하는 경우에만 웹브라우저가 웹서버에 전송하게 되어있다
            'HttpOnly=HttpOnly; HttpOnly',               //보안을 위해 자바스크립트로 접근을 못하게 하는 옵션
            'Path=Path; Path=/cookie',                   //특정 path와 그 디렉토리 아래(하위디렉토리)에서만 거기에 해당되는 쿠키만을 웹 서버에 전송한다 (locslhost:3000/cookie)&(locslhost:3000/cookie/~~)로 가야만 Path쿠키가 활성화 되어있다
            //'Domain=Domain; Domain=o2.org'             //(o2.org)에서만 동작할지가 아니라 예를 들어 (test.o2.org)와 같은 서브도메인에서도 살아남는다
        ]                                                //한번 보내고 주석처리를 해도 request에 쿠키값이 찍혀있다.
    });
    response.end('Cookie!!');
}).listen(3000);
/* 
    웹 브라우저를 끄면 사라지는 휘발성 쿠키 = Session Cookie (일반적인 쿠키)
    웹 브라우저를 꺼도 사라지지 않는 쿠키 = Permanent Cookie (날짜를 지정)


    쿠키를 지정하는 코드들을 한번 실행하고 주석처리하고 실행하면 Request Headers에는 쿠키내역이 남지만 Response Headers에는 쿠키를 설정하고있지않다.
*/
