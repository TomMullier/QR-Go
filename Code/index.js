const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const path = require("path");
const bodyParser = require("body-parser");
const sharedsession = require('express-socket.io-session');
const {MongoClient} = require("mongodb");
const BDD = require("./Model/bdd/bdd.js");

const session = require("express-session")({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 2 * 60 * 60 * 1000,
        secure: false,
    },
});



const {
    body,
    validationResult
} = require("express-validator");

const dBconnection =  new MongoClient("mongodb://0.0.0.0:27017");
BDD.main(dBconnection);
const database = dBconnection.db("admin");
BDD.addUser(database);


//app.use(jsonParse);
app.use(express.static(path.join(__dirname, "/Vue/")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/Vue/index.html"));
});


http.listen(4200, () => {
    console.log("Serveur lancé sur le port 4200");
});