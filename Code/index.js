const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const path = require("path");
const bodyParser = require("body-parser");
const sharedsession = require("express-socket.io-session");
const { MongoClient } = require("mongodb");
const { body, validationResult } = require("express-validator");
const session = require("express-session")({
    secret: "eb8fcc253281389225b4f7872f2336918ddc7f689e1fc41b64d5c4f378cdc438",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 2 * 60 * 60 * 1000,
        secure: false,
    },
});

const BDD = require("./Model/bdd/bdd.js");
const CRYPT = require("./Model/bdd/crypt.js");

const jsonParse = bodyParser.json();
app.use(jsonParse);
app.use(session);
app.use(express.static(path.join(__dirname, "Vue")));

io.use(
    sharedsession(session, {
        // Session automatically change if changement
        autoSave: true,
    })
);

const hostname = "10.224.4.159"; // ISEN
//! const hostname = "localhost"; //! HOME
const port = 4200;

/* -------------------------------------------------------------------------- */
/*                        NE PAS EFFACER CE COMMENTAIRE                       */
/* -------------------------------------------------------------------------- */
// .\mongosh --host 10.224.4.159 --port 27017
// restart mongodb serveur (services)
const dBconnection = new MongoClient("mongodb://10.224.4.159/27017"); // ISEN-MAX
//!const dBconnection = new MongoClient("mongodb://0.0.0.0/27017"); //! HOME
BDD.connexion(dBconnection);
const database = dBconnection.db("admin");

app.get("/", (req, res) => {
    res.sendFile("index.html");
});

// get the login page
app.get("/login", (req, res) => {
    if (!req.session.mail) {
        res.sendFile(__dirname + "/Vue/HTML/login.html");
    } else {
        res.redirect("/user_route_list");
    }
});

// post the register page
app.post(
    "/login",
    body("mail").isLength({ min: 3 }).trim().escape(),
    body("password").isLength({ min: 3 }).trim(),
    (req, res) => {
        console.log("--- LOGIN ---");

        let mail = req.body.mail;
        let password = req.body.password;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.error(errors);
            res.status(400).json({
                errors: errors.array(),
            });
        } else {
            console.log("Login user", "mail : " + mail, "password : " + password);
            CRYPT.login(password, (pass) => {
                BDD.login(database, mail, pass, (hashMatch, admin) => {
                    if (hashMatch == true) {
                        req.session.mail = req.body.mail;
                        req.session.admin = admin;
                        req.session.save();
                        res.send("OK");
                    }else{
						res.status(400).send('password incorrect')
					}
                });
            });
        }
    }
);

// get the register page
app.get("/register", (req, res) => {
    if (!req.session.mail) {
        res.sendFile(path.join(__dirname + "/Vue/HTML/register.html"));
    } else {
        res.redirect("/user_route_list");
    }
});

// post the register page
app.post(
    "/register",
    body("mail").isLength({ min: 3 }).trim().escape(),
    body("name").isLength({ min: 3 }).trim().escape(),
    body("surname").isLength({ min: 3 }).trim().escape(),
    body("password").isLength({ min: 3 }).trim(),
    (req, res) => {
        console.log("--- REGISTER ---");

        let mail = req.body.mail;
        let name = req.body.name;
        let surname = req.body.surname;
        let password = req.body.password;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.error(errors);
            res.status(400).json({
                errors: errors.array(),
            });
        } else {
            console.log("Registering " + name + " " + surname + " with mail " + mail);
            CRYPT.register(password, (hash) => {
                BDD.register(database, name, surname, mail, hash, (inserted, admin) => {
                    if (inserted == true) {
                        req.session.mail = req.body.mail;
                        req.session.admin = admin;
                        req.session.save();
                        res.send("OK");
                    } else {
                        console.log("User already in DB");
						res.status(400).send('Already in DB')
                    }
                });
            });
        }
    }
);

app.get("/connect_admin", (req, res) => {
    if (!req.session.mail) {
        res.redirect("/login");
    } else {
        let admin = req.session.admin;
        if (admin) res.redirect("/admin_route_list");
        else {
            res.redirect("/user_route_list");
        }
    }
});

app.get("/user_route_list", (req, res) => {
    if (req.session.mail) {
        res.sendFile(__dirname + "/Vue/HTML/user_route_list.html");
    } else {
        res.redirect("/");
    }
});

app.get("/scan", (req, res) => {
    if (req.session.mail) {
        res.sendFile(__dirname + "/Vue/HTML/scan.html");
    } else {
        res.redirect("/");
    }
});

app.get("/admin_location_list", (req, res) => {
    if (req.session.mail) {
        res.sendFile(__dirname + "/Vue/HTML/admin/admin_location_list.html");
    } else {
        res.redirect("/");
    }
});

app.get("/admin_route_list", (req, res) => {
    if (req.session.mail) {
        res.sendFile(__dirname + "/Vue/HTML/admin/admin_route_list.html");
    } else {
        res.redirect("/");
    }
});

io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

http.listen(port, hostname, () => {
    // console.log("Serveur lancé sur le port 4200");
    console.log(`Server running at http://${hostname}:${port}`);
});
