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
					callback(true, userFound.admin);
				} else {
					console.log("Wrong password");
					callback(false, userFound.admin);
				}
			});
		}
	});
}

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

async function addRoute(client, title, description, duration, steps, stepsTab, autor) {
	try {
		await client.collection("routes").insertOne({
			title: title,
			description: description,
			duration: duration,
			steps: steps,
			stepsTab: stepsTab,
			autor: autor
		});
		console.log("Ajout de parcours réussi :" + title);
	} catch (err) {
		console.log("Erreur d'ajout parcours");
	}
}

async function findStepById(client, id) {
	try {
		const query = { _id: id };
		const options = {
			projection: { _id: 0, title: 1, description: 1, stage: 1 },
		};
		let step = await client.collection("steps").findOne(query, options);
		if (step) {
			console.log("Etape trouvée titre : " + step.title);
			return step;
		} else {
			console.log("Etape non trouvée");
			return false;
		}
	} catch (err) {
		console.log("Erreur de recherche étape par id");
	}
}

// Export functions
module.exports = {
	connexion,
	register,
	login,
	addLocation,
	modifyLocation,
	deleteLocation,
	getAllLocation,
	addRoute,
	findStepById,
};
