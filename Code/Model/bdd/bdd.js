function main(client) {
    try {
        client.connect();
        console.log("Connexion réussie à la base de données");
    } catch (err) {
        console.log("Erreur de connexion");
    }
};


async function addUser(client, name, surname, email, password) {
    try {
        await client.collection("user").insertOne({
            name: name,
            surname: surname,
            email: email,
            password: password,
        });
        console.log("Ajout réussi de " + name + " " + surname + " à la BDD. Email : " + email);
    } catch (err) {
        console.log("Erreur d'ajout");
    }
}

async function findUserByEmail(client, email) {
    try {
        const query = { email: email }
        const options = {
            projection: { _id: 0, name: 1, surname: 1, email: 1, password: 1 }
        }
        let user = await client.collection("user").findOne(query, options);
        if (user) {
            console.log("User found with email : |" + email + "| called : " + user.name + " " + user.surname);
            return true;
        }
        else {
            console.log("User not found with email : |" + email + "|");
            return false;
        }

    } catch (err) {
        console.log("Erreur de recherche")
    }
}


// Export functions 
module.exports = {
    main,
    addUser,
    findUserByEmail,
};