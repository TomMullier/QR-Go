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
const MDP = require("./Model/bdd/password.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session);
app.use(express.static(path.join(__dirname, "/Vue/")));
app.set("Vue", path.join(__dirname, "/Vue/"));

io.use(
  sharedsession(session, {
    // Session automatically change if changement
    autoSave: true,
  })
);

const hostname = "10.224.1.111";
const port = 4200;

/* -------------------------------------------------------------------------- */
/*                        NE PAS EFFACER CE COMMENTAIRE                       */
/* -------------------------------------------------------------------------- */
// .\mongosh --host 10.224.4.159 --port 27017
// restart mongodb serveur (services)
const dBconnection = new MongoClient("mongodb://10.224.4.159/27017");
BDD.connexion(dBconnection);
const database = dBconnection.db("admin");
// console.log(database);
//BDD.addUser(database, "Marcel", "Casablanca", "mc@student.junia.com", "OMG69XDDD");
//BDD.findUserByEmail(database, "jp@student.junia.com");
//let test = BDD.findUserByEmail(database, "mc@student.junia.com");
//console.log(test);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/Vue/index.html"));
});

// get the login page
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname + "/Vue/HTML/login.html"));
});

// post the register page
app.post( "/login",
  body("mail").isLength({ min: 3 }).trim().escape(),
  body("password").isLength({min: 3,}).trim(),
  async (req, res) => {
    console.log("--- LOGIN ---");
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.error(errors);
            res.status(400).json({
                errors: errors.array(),
            });
        }else{            
            let userFound = await BDD.checkLogin(database, req.body.mail, req.body.password);
            if(userFound){
                req.session.mail = req.body.mail;
                req.session.save();
                res.sendFile('/user_route_list');
            }else{
                console.log("User already in DB"); 
            }
        }
  }
);

// get the register page
app.get("/register", (req, res) => {
        res.sendFile(path.join(__dirname + "/Vue/HTML/register.html"));
    }
);

// post the register page
app.post("/register", 
    body("mail").isLength({ min: 3 }).trim().escape(),
    //body("name").isLength({ min: 3 }).trim().escape(),
    //body("surname").isLength({ min: 3 }).trim().escape(),
    body("password").isLength({min: 3,}).trim(),
    body("confirm").isLength({min: 3,}).trim(),
    async (req, res) => {
        console.log("--- REGISTER ---");
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.error(errors);
            res.status(400).json({
                errors: errors.array(),
            });
        }else{            
            let userFound = await BDD.findUserByEmail(database, req.body.mail);
            if(!userFound){
                BDD.addUser(database, req.body.name, req.body.surname, req.body.mail, req.body.password);
                req.session.mail = req.body.mail;
                req.session.save();
                res.sendFile('/user_route_list');
            }else{
                console.log("User already in DB"); 
            }
        }
    }
);

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
