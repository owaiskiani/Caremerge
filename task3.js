var express = require('express');
var Utils = require("../utility/utils");
var http = require('http');
var https = require('https');
var fs = require('fs');
var q = require("q");
var router = express.Router();
var async = require("async");


router.get("/", function (req, res) {
    if (!req.query.hasOwnProperty("address")) {
        res.render('index.ejs', {list: 0, length: 0, message: "400 - Bad Request, address parameter is missing. specify address parameter with website url value like address=google.com"});
    }

    var address = req.query.address;
    var urls = typeof address === "object" ? address.join(",") : address;

    if (!urls) {
        res.render('index.ejs', {list: 0, length: 0, message: 'No Data'});
    }

    var urls = urls.split(","),
            taskRun = function () {
                var title = [];
                var single_title = '';
                urls.forEach(function (url) {
                    var p = q.promise(function (resolve, reject, notify) {
                        var curl = !/^(http|https):\/\//.test(url) ? 'http://' + url : url;
                        http.get(curl, function (result) {
                            var data = "";
                            result.on("data", function (chunk) {
                                data += chunk;
                            });

                            result.on("end", function () {
                                single_title = Utils.bodyParser(curl, data);
                                resolve(single_title);
                            });
                        }).on("error", function (e) {
                            single_title = curl + ' - "NO RESPONSE"';
                            resolve(single_title);
                        });

                    });
                    title.push(p);
                });

                q.all(title).then(function (data) {
                    res.render('index.ejs', {list: data, length: 1, message: 'Success'});
                }).done();
            };
    taskRun();
});
module.exports = router;
