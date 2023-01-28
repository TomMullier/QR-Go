const bcrypt = require("bcrypt"); // Pour le hash du mot de passe

// Connexion à la base de donnée
async function connexion(client) {
	console.time("Connection to data base");
	try {
		await client.connect();
		console.log("Connection success to data base");
	} catch (err) {
		console.log(err);
		console.log("Connection error");
	} finally {
		console.timeEnd("Connection to data base");
	}
}

// Création d'un utilisateur après vérification de non-existance
function register(client, name, surname, mail, hash, callback) {
	if (name == "" || surname == "" || mail == "" || hash == "") return;
	else if (name == null || surname == null || mail == null || hash == null) return;

	const obj = {
		name: name,
		surname: surname,
		mail: mail,
		hash: hash,
		admin: false,
	};
	const query = { mail: mail };
	const options = {
		projection: { _id: 0, name: 1, surname: 1, email: 1, hash: 1, admin: 1 },
	};
	let users = client.collection("users");
	// Check if user already exists, if not insert it in DB
	users.findOne(query, options, (err, userFound) => {
		//if (err) throw err;

		if (userFound) {
			console.log("User already in DB - Need to login");
			callback(false, false);
		} else {
			users.insertOne(obj, (err, res) => {
				if (err) {
					console.log("Error inserting user in DB");
					callback(false, obj.admin);
				} else {
					console.log("User registered and inserted in DB");
					callback(true, obj.admin);
				}
			});
		}
	});
}

// Vérification si mail et mot de passe bon pour connexion
function login(client, mail, password, callback) {
	if (mail == "" || password == "") return;
	else if (mail == null || password == null) return;

	const query = { mail: mail };
	const options = { projection: { _id: 0, name: 1, surname: 1, mail: 1, hash: 1, admin: 1 } };
	let users = client.collection("users");

	users.findOne(query, options, (err, userFound) => {
		//if (err) throw err;
		console.log(userFound);

		if (!userFound) {
			console.log("User not registered");
			callback(false, false);
		} else {
			bcrypt.compare(password, userFound.hash, (err, match) => {
				if (err) {
					console.error(err);
					return 0;
				}
				if (match) {
					console.log("User logged in");
					callback(true, userFound.admin, userFound.name, userFound.surname);
				} else {
					console.log("Wrong password");
					callback(false, userFound.admin);
				}
			});
		}
	});
}

/* -------------------------------------------------------------------------- */
/*                            LOCATION (ADMIN ONLY)                           */
/* -------------------------------------------------------------------------- */

// Ajoute une étape
function addLocation(client, name, description, instruction, callback) {
	const query = { name: name };
	const options = { projection: { _id: 0, name: 1, description: 1, instruction: 1 } };
	let locations = client.collection("locations");

	locations.findOne(query, options, (err, locationFound) => {
		//if (err) throw err;
		if (locationFound && locationFound.name == name) {
			return callback(true);
		} else {
			locations.insertOne({
				name: name,
				description: description,
				instruction: instruction,
			}, (err, res) => {
				if (err) {
					console.log("Add location failed : " + name);
					return callback(true);
				} else {
					console.log("Add location successed : " + name);
					return callback(false, locationFound);
				}
			});
		}
	})
}

// Modifie une étape existante
function modifyLocation(client, name, description, instruction, callback) {
	let locations = client.collection("locations");
	filter = {
		name: name
	}
	update = {
		$set: {
			description: description,
			instruction: instruction
		}
	}
	locations.updateOne(filter, update, (err, res) => {
		//console.log(res);
		if (err) throw err;
		callback()
	})
}

// Supprime une étape existante
function deleteLocation(client, name, callback) {
	let locations = client.collection("locations");

	locations.deleteOne({ name: name }, (err, res) => {
		//console.log(res);
		if (err) throw err;
		callback()
	})
}

// Retourne toutes les étapes
function getAllLocation(client, callback) {
	let locations = client.collection("locations");

	locations.find({}).toArray((err, res) => {
		callback(res);
	})
}

/* -------------------------------------------------------------------------- */
/*                                   ROUTES                                   */
/* -------------------------------------------------------------------------- */

/* ----------------------- ADMIN ROUTE ---------------------------*/

// Ajoute un parcours
function addRoute(client, name, description, duration, locations, author, callback) {
	const query = { name: name };
	const options = { projection: { _id: 0, name: 1, description: 1, duration: 1, locations: 1, author: 1 } };
	let routes = client.collection("routes");

	routes.findOne(query, options, (err, routeFound) => {
		//if (err) throw err;
		if (routeFound && routeFound.name == name) {
			return callback(true);
		} else {
			routes.insertOne({
				name: name,
				description: description,
				duration: duration,
				locations: locations,
				author: author,
			}, (err, res) => {
				if (err) {
					console.log("Add route failed : " + name);
					return callback(true);
				} else {
					console.log("Add route successed : " + name);
					return callback(false, routeFound);
				}
			});
		}
	})
}

// Modifie un parcours existant
function modifyRoute(client, name, description, duration, locations, author, callback) {
	let routes = client.collection("routes");
	filter = {
		name: name
	}
	update = {
		$set: {
			description: description,
			duration: duration,
			locations: locations,
			author: author
		}
	}

	routes.updateOne(filter, update, (err, res) => {
		//console.log(res);
		if (err) throw err;
		callback()
	})
}

// Supprime un parcours existant
function deleteRoute(client, name, callback) {
	let routes = client.collection("routes");
	routes.deleteOne({ name: name }, (err, res) => {
		//console.log(res);
		if (err) throw err;
		callback()
	})
}

// Retourne touts les parcours existants
function getAllRoutes(client, callback) {
	let routes = client.collection("routes");
	routes.find({}).toArray((err, res) => {
		callback(res);
	})
}

// Retourne étape utilisé / non utilisé pour un parcours recherché par nom
async function getRouteInfo(client, name, exist, callback) {
	const queryR = { name: name };
	const optionsR = { projection: { _id: 0, name: 1, description: 1, duration: 1, locations: 1, author: 1 } };
	const optionsL = { projection: { _id: 0, name: 1, description: 1, instruction: 1 } };

	let routes = client.collection("routes");
	let locations = client.collection("locations")

	let locUsed = [];
	let locAvailable = [];

	if (exist) {
		try {
			let routeFound = await routes.findOne(queryR, optionsR);
			let locNames = routeFound.locations;
			console.log(locNames);

			// try {
			for (let index = 0; index < locNames.length; index++) {
				let locName = locNames[index]
				const queryL = { name: locName };
				try {
					let locFound = await locations.findOne(queryL, optionsL)
					let obj = {
						name: locFound.name,
						description: locFound.description
					}
					locUsed.push(obj)
				} catch (err) {
					console.log(err)
				}
			}
		} catch (err) {
			console.log(err);
		}
	}
	try {
		let allLoc = await locations.find({}).toArray()

		let locUsedName = []
		locUsed.forEach(loc => {
			locUsedName.push(loc.name)
		});

		allLoc.forEach(loc => {
			if (!locUsedName.includes(loc.name)) {
				locAvailable.push(loc)
			}
		})
	} catch (err) {
		console.log(err);
	}

	console.log("LOC USED :", locUsed.length);
	console.log("LOC FREE :", locAvailable.length);
	callback(locUsed, locAvailable)
}

async function getAllLocationInRoute(client, name, callback){
	const queryR = { name: name };
	const optionsR = { projection: { _id: 0, name: 1, description: 1, duration: 1, locations: 1, author: 1 } };
	let routes = client.collection("routes")

	let allLocName =[];
	try{
		let routeFound = await routes.findOne(queryR, optionsR)
		routeFound.locations.forEach(loc=>{
			allLocName.push(loc)
		})
	}catch (err){
		console.log(err);
	}
	console.log("ALL LOC NAME ", allLocName);
	callback(allLocName);
}

/* ----------------------- USER ROUTE ---------------------------*/
// Retourne tout les parcours existant
function getAllUsersRoutes(client, callback) {
	let routes = client.collection("routes");

	routes.find({}).toArray((err, res) => {
		callback(res);
	})
}

/* -------------------------- SCAN ------------------------------*/
async function getCurrentCard(client, name, step, callback){
	const queryR = { name: name };
	const optionsR = { projection: { _id: 0, name: 1, description: 1, duration: 1, locations: 1, author: 1 } };
	const optionsL = { projection: { _id: 0, name: 1, description: 1, instruction: 1 } };

	let routes = client.collection("routes")
	let locations = client.collection("locations")
	let currentLocation;

	try{
		let currentRoute = await routes.findOne(queryR, optionsR)
		if(step == currentRoute.locations.length){
			callback("","","",true)
			return
		}
		let currentLocationName = currentRoute.locations[step] //reading location
		console.log("STEP ", step);

		console.log("CUR LOC NAME", currentLocationName);
		const queryL = {name: currentLocationName}
		try{
			currentLocation = await locations.findOne(queryL, optionsL)
		}catch (err){
			console.log(err);
		}
	}catch (err){
		console.log(err);
	} 
	console.log("CUR LOC", currentLocation);
	callback(currentLocation.name,currentLocation.description,currentLocation.instruction, false)
}


// Export functions
module.exports = {
	connexion,
	// USER
	register,
	login,

	// LOCATION
	addLocation,
	modifyLocation,
	deleteLocation,
	getAllLocation,

	// ROUTE
	addRoute,
	modifyRoute,
	deleteRoute,
	getAllRoutes,
	getRouteInfo,
	getAllLocationInRoute,

	// USER ROUTE
	getAllUsersRoutes,

	// SCAN
	getCurrentCard,
};
