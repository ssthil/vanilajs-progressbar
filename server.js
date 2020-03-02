var express = require("express");
var app = express();

// set port
var port = process.env.PORT || 3000

app.use(express.static(__dirname));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

// routes

app.get("/", function(req, res) {
    res.render("index");
})

app.listen(port, function() {
    console.log("app running in " + port);
})