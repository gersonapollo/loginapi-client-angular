var express = require("express"),
    app = express(),
 
    bodyParser = require('body-parser'),
    hostname = process.env.HOSTNAME || 'localhost',
    port = parseInt(process.env.PORT, 10) || 4567;
 
 
app.use(bodyParser.json());
 
app.use(bodyParser.urlencoded({
    extended: true
}));
 
app.use(express.static(__dirname));
 

app.get("/", function(req, res) {
    res.redirect("/index.html");
});
 
console.log("Simple server listening at http://" + hostname + ":" + port);
 
app.listen(port, hostname);