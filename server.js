var http = require("http");
var https = require("https");
var express = require('express');

var tls = require('tls');
var fs = require('fs');

var request = require("request");
var async = require('async');
var bodyParser = require('body-parser');
// var request = require('request-ssl');
// request.addFingerprint('api.robinhood.com', '8F:C1:46:FB:19:0A:16:FF:F7:D1:E6:48:5C:74:54:0E:00:FF:36:A6');

var app = express();
app.listen(process.env.PORT || 3000, function () { 
    console.log('Running REST HTTPS server');
});



// var options = {
//    key  : fs.readFileSync('server.enc.key'),
//    cert : fs.readFileSync('server.crt')
// };

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static(__dirname + '/public'));



// http.createServer(options, app).listen(process.env.PORT || 3000, function () { 
//     console.log('Running REST HTTPS server at port 3000');
// });






app.get('/', function (request, response){
    response.sendFile(path.resolve(__dirname, '/public', 'index.html'));
});

app.post('/token', function(req, res){

    var username = req.body.username;
    var password = req.body.password;
    

    var options = { 
        method: 'POST',
        url: 'https://api.robinhood.com/api-token-auth/',
        form: { username: username, password: password},
        headers: 
        { 
            'content-type': 'application/x-www-form-urlencoded'} 
        };

    request(options, function (error, response, body) {
    if (error) throw new Error(error);

        res.json(JSON.parse(body));
    });
});
app.get('/tokenWithMFA', function(req, res){

    var username = req.query.username;
    var password = req.query.password;
    var mfa_code = req.query.mfa_code;

    var options = { 
        method: 'POST',
        url: 'https://api.robinhood.com/api-token-auth/',
        form: { username: username, password: password, mfa_code: mfa_code},
        headers: 
        { 
            'content-type': 'application/x-www-form-urlencoded'} 
        };

    request(options, function (error, response, body) {
    if (error) throw new Error(error);


        res.json(JSON.parse(body));
    });
});

app.get('/quote', function(req, res){

    var ticker = req.query.ticker;

    var options = { 
        method: 'GET',
        url: 'https://api.robinhood.com/quotes/',
        qs: { symbols: ticker},
        headers: 
        { 
            'cache-control': 'no-cache' } 
        };

    request(options, function (error, response, body) {
    if (error) throw new Error(error);

        res.json(JSON.parse(body));
    });
});
app.get('/instruments', function(req, res){

    var ticker = req.query.ticker;

    var options = { 
        method: 'GET',
        url: 'https://api.robinhood.com/quotes/',
        qs: { symbols: ticker},
        headers: 
        { 
            'cache-control': 'no-cache' } 
        };

    request(options, function (error, response, body) {
    if (error) throw new Error(error);

        res.json(JSON.parse(body));
    });
});


app.get('/accountInfo', function(req, res){

    var token = req.query.token;

    var options = { 
        method: 'GET',
        url: 'https://api.robinhood.com/portfolios/',
        headers: { Authorization: 'Token ' + token}
        };

    request(options, function (error, response, body) {
    if (error) throw new Error(error);

        res.json(JSON.parse(body));
    });
});

app.get('/positions', function(req, res){

    var token = req.query.token;
    var options = { 
        method: 'GET',
        url: 'https://api.robinhood.com/positions/',
        headers: { Authorization: 'Token ' + token}
        };

    request(options, function (error, response, body) {
    if (error) throw new Error(error);

        // console.log(body);
        res.json(JSON.parse(body));
    });
});


app.get('/instrumentsData', function(req, res){
    var token = req.query.token;
    // var instrumentUrl = req.query.instrumentUrl;
    var collection = req.query.collection;
    var url;


    function httpGet(url, callback) {
        const options = {
            url :  url,
            json : true
        };
        request(options,
            function(err, res, body) {
                callback(err, body);
            }
        );
    }
    async.map(collection, httpGet, function (err, response){
        if (err) return console.log(err);
            res.send(response);
    });

});

app.get('/allQuotes', function(req, res){

    var token = req.query.token;
    var symbols = req.query.symbols;
    var options = { 
        method: 'GET',
        url: 'https://api.robinhood.com/quotes/?symbols=' + symbols,
        headers: { Authorization: 'Token ' + token}
        };

    request(options, function (error, response, body) {
    if (error) throw new Error(error);

        res.json(JSON.parse(body));
    });
});

app.get('/fundamentals', function(req, res){

    var token = req.query.token;
    var symbol = req.query.symbol;
    var options = { 
        method: 'GET',
        url: 'https://api.robinhood.com/fundamentals/'+symbol+'/',
        headers: { Authorization: 'Token ' + token}
        };

    request(options, function (error, response, body) {
    if (error) throw new Error(error);

        // console.log(body);
        res.json(JSON.parse(body));
    });
});


app.get('/historicals', function(req, res){

    var token = req.query.token;
    var symbol = req.query.symbol;
    var options = { 
        method: 'GET',
        url: 'https://api.robinhood.com/quotes/historicals/'+symbol+'/?interval=day&?span=week',
        headers: { Authorization: 'Token ' + token}
        };

    request(options, function (error, response, body) {
    if (error) throw new Error(error);

        res.json(JSON.parse(body));
    });
});