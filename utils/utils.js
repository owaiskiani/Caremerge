var cheerio = require("cheerio");

function Utils(){
    
}

Utils.prototype.bodyParser = function(url, data){
    var title = "NO RESPONSE";
    if(data){
        var $ = cheerio.load(data);
        title = $("title").text();
    }
    return url + ' - "' + title + '"';    
};

module.exports = new Utils();
