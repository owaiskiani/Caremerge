var express = require('express');
var http = require('http')
var fs = require('fs');
var router = require('./routes/task3');
var app = express();

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.set('view engine', 'ejs');

app.use('/I/want/title', router);

app.use("*", function (req, res) {
    res.render('404.ejs');
});

var httpServer = http.createServer(app);

httpServer.listen(3000, function () {
    console.log("server listening on port: 3000");
});
