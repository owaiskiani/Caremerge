var express = require('express');
var Utils = require("../utility/utils");
var http = require('http');
var https = require('https');
var fs = require('fs');
var router = express.Router();
var async = require("async");


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
        async.whilst(
                function () {
                    return urls.length > 0;
                },
                function (callback) {
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
                            title[count] = Utils.bodyParser(url, data);
                            callback(null, title);
                        });
                        count++;
                    }).on("error", function (err) {
                        title[count] = url + ' - "NO RESPONSE"';
                        callback(null, title);
                    });
                },
                function (err, data) {
                    if (err)
                        throw err;
                    res.render('index.ejs', {list: data, length: 1, message: 'Success'});
                }

        );
    } else {
        res.render('index.ejs', {list: 0, length: 0, message: 'No Data'});
    }


});
module.exports = router;