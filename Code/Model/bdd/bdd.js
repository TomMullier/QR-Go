async function connexion(client){
  console.time('Connexion à la base de données')
    try{
        await client.connect();
        console.log("Connexion réussie à la base de données");
    } catch (err) {
        console.log(err);
        console.log("Erreur de connexion");
    } finally{
        console.timeEnd('Connexion à la base de données')
    }
};

async function addUser(client, name, surname, email, password) {
    try {
        await client.collection("users").insertOne({
            name: name,
            surname: surname,
            email: email,
            password: password,
        });
        console.log("Ajout réussi de " + name + " " + surname + " à la BDD. Email : " + email);
    } catch (err) {
        console.log("Erreur d'ajout utilisateur");
    }
}

async function addStep(client, title, description, stage, qrcode) {
    try {
        await client.collection("steps").insertOne({
            title: title,
            description: description,
            stage: stage,
            qrcode: qrcode,
        });
        console.log("Ajout d'étape réussi :" + title);
    } catch (err) {
        console.log("Erreur d'ajout étape");
    }
}

async function addRoute(client, title, description, duration, steps, stepsTab){
    try {
        await client.collection("routes").insertOne({
            title: title,
            description: description,
            duration: duration,
            steps: steps,
            stepsTab: stepsTab,
        });
        console.log("Ajout de parcours réussi :" + title);
    } catch (err) {
        console.log("Erreur d'ajout parcours");
    }
}

async function findUserByEmail(client, mail) {
        const query = { email: mail }
        const options = {
            projection: { _id: 0, name: 1, surname: 1, email: 1, password: 1 }
        }
        try{
          let result = await client.collection("users").findOne(query, options);
          console.log(result);
          if (result) {
            console.log("Utilisateur trouvé avec email : |" + mail + "| s'appelant : " + result.name + " " + result.surname);
            return result;
          }
          else {
            console.log("Utilisateur non trouvé avec email : |" + mail + "|");
            return result;
          }
        } catch (err) {
          console.log(err)
          return Error("Erreur de recherche utilisateur par email")
        }
}

async function findStepById(client, id) {
    try {
        const query = { _id: id }
        const options = {
            projection: { _id: 0, title: 1, description: 1, stage: 1}
        }
        let step = await client.collection("steps").findOne(query, options);
        if (step) {
            console.log("Etape trouvée titre : " + step.title);
            return step;
        }
        else {
            console.log("Etape non trouvée");
            return false;
        }

    } catch (err) {
        console.log("Erreur de recherche étape par id")
    }
}

async function checkLogin(client, email, password){
    const query = { password: password }
    const options = {
        projection: { _id: 0, name: 1, surname: 1, email: 1, password: 1 }
    }
    let userFound = await findUserByEmail(client, email);

    if (userFound && userFound.password === password) return true;
    return false;
}


// Export functions 
module.exports = {
    connexion,
    addUser,
    addStep,
    addRoute,
    findUserByEmail,
    findStepById,
    checkLogin
};