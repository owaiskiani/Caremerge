var express = require('express');
var Utils = require("../utility/utils");
var http = require('http');
var https = require('https');
var fs = require('fs');
var router = express.Router();

router.get("/", function (req, res) {
    if (!req.query.hasOwnProperty("address")) {
        res.render('index.ejs', {list: 0, length: 0, message: "400 - Bad Request, address parameter is missing. specify address parameter with website url value like address=google.com"});
    }

    var address = req.query.address;
    var title = [];
    var urls = typeof address === "object" ? address.join(",") : address;
    if (urls) {
        var urls = urls.split(",");
        var count = 0;
        var taskRun = function () {
            if (urls.length) {
                var address = urls[0].replace('http://', '');
                address = address.replace('www.', '');
                address = address.replace('www', '');
                var url = 'http://www.' + address;
                urls.shift();
                http.get(url, function (result) {
                    var data = "";
                    result.on("data", function (chunk) {
                        data += chunk;
                    });
                    result.on("end", function () {
                        var single_title = Utils.bodyParser(url, data);
                        title[count] = single_title;
                        taskRun();
                    });
                }).on("error", function (e) {
                    title[count] = url + ' - "NO RESPONSE"';
                    taskRun();
                });
                count++;
            } else {
                res.render('index.ejs', {list: title, length: 1, message: 'Success'});
            }
        };
        taskRun();
    } else {
        res.render('index.ejs', {list: 0, length: 0, message: 'No Data'});
    }
});
module.exports = router;
