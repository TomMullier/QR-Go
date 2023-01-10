const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const path = require("path");
const bodyParser = require("body-parser");
const sharedsession = require('express-socket.io-session');
const { MongoClient } = require("mongodb");
const BDD = require("./Model/bdd/bdd.js");

const hostname = "10.224.1.45";
const port = 4200;

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

/* -------------------------------------------------------------------------- */
/*                        NE PAS EFFACER CE COMMENTAIRE                       */
/* -------------------------------------------------------------------------- */
// .\mongosh --host 10.224.4.159 --port 27017
// restart mongodb serveur (services)
const dBconnection =  new MongoClient("mongodb://10.224.4.159:27017");
BDD.main(dBconnection);
const database = dBconnection.db("admin");
// console.log(database);
BDD.addUser(database, "Jean", "Patrick", "jp@student.junia.com", "OMG69XDDD");
BDD.findUserByEmail(database, "jp@student.junia.com");
BDD.findUserByEmail(database, "test2");


//app.use(jsonParse);
app.use(express.static(path.join(__dirname, "/Vue/")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/Vue/index.html"));
});

io.on('connection', (socket) => {
    console.log("User connected");

    socket.on('disconnect', () => {
        console.log("User disconnected")
    })
});


http.listen(port, hostname, () => {
    // console.log("Serveur lancé sur le port 4200");
    console.log(`Server running at http://${hostname}:${port}`)
});