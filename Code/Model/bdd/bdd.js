const bcrypt = require("bcrypt");

async function connexion(client) {
	console.time("Connexion à la base de données");
	try {
		await client.connect();
		console.log("Connexion réussie à la base de données");
	} catch (err) {
		console.log(err);
		console.log("Erreur de connexion");
	} finally {
		console.timeEnd("Connexion à la base de données");
	}
}

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
					callback(false, admin);
				} else {
					console.log("User registered and inserted in DB");
					callback(true, admin);
				}
			});
		}
	});
}

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
/*                                  LOCATION                                  */
/* -------------------------------------------------------------------------- */

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
					console.log("Ajout d'étape manqué : " + name);
					return callback(true);
				} else {
					console.log("Ajout d'étape réussi : " + name);
					return callback(false, locationFound);
				}

			});
		}
	})
}

function modifyLocation(client, name, description, instruction, callback) {
	let locations = client.collection("locations");

	filter = {
		name:name
	}
	update = {
		$set:{
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

function deleteLocation(client, name, callback) {
	let locations = client.collection("locations");

	locations.deleteOne({name:name}, (err, res) => {
		//console.log(res);
		if (err) throw err;
		callback()	
	})
}

function getAllLocation(client, callback) {
	let locations = client.collection("locations");

	locations.find({}).toArray((err, res) => {
		callback(res);
	})
}


/* -------------------------------------------------------------------------- */
/*                                   ROUTES                                   */
/* -------------------------------------------------------------------------- */

function addRoute(client, name, description, duration, locations, author, callback) {
	const query = { name: name };
	const options = { projection: { _id: 0, name: 1, description: 1, duration: 1, locations: 1, author: 1} };
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
					console.log("Ajout d'étape manqué : " + name);
					return callback(true);
				} else {
					console.log("Ajout d'étape réussi : " + name);
					return callback(false, routeFound);
				}

			});
		}
	})
}


function modifyRoute(client, name, description, duration, locations, author, callback) {
	let routes = client.collection("routes");

	filter = {
		name:name
	}
	update = {
		$set:{
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



function deleteRoute(client, name, callback) {
	let routes = client.collection("routes");

	routes.deleteOne({name:name}, (err, res) => {
		//console.log(res);
		if (err) throw err;
		callback()	
	})
}

function getAllRoutes(client, callback) {
	let routes = client.collection("routes");

	routes.find({}).toArray((err, res) => {
		callback(res);
	})
}

// Export functions
module.exports = {
	connexion,
	//USER
	register,
	login,

	// LOCATION
	addLocation,
	modifyLocation,
	deleteLocation,
	getAllLocation,

	//ROUTE
	addRoute,
	modifyRoute,
	deleteRoute,
	getAllRoutes,
};
