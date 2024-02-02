let express = require('express');
let app = express();
let dotenv = require('dotenv').config();
let bodyParser = require('body-parser');

console.log("Hello World");

// app.use(express.static(__dirname + "/public"));
app.use("/public", express.static(__dirname + "/public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", function(req, res){
    // res.send("Hello Express");
    let pathFile = __dirname + "/views/index.html"
    res.sendFile(pathFile);
});

app.get("/json", function(req, resp){
    // res.json({"message": "Hello json"});
    if(process.env.MESSAGE_STYLE=="uppercase"){
        res.json({"message": "HELLO JSON"});
    } else{
        res.json({"message": "Hello json"});
    }
});

app.use("/reg", function(req, res, next){
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
});

app.get("/now", function(req, res, next){
    req.time = new Date().toString();
    next();
}, function(req, res){
    res.json({"time": req.time});
});

app.post("/:word/echo", function(req, res){
    const {word} = req.param.word;
    res.json({"echo": word});
});

app.get("/name", function(req, res){
    const {first: firstname, last: lastname} = req.query;
    const fullname = firstname + " " + lastname;
    res.json({ name: fullname});
});

app.post("/name", function(req, res){
    const fullname = req.body.firstname + " " + req.body.lastname;
    res.json({ name: fullname});
});


module.exports = app;