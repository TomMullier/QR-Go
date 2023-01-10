async function main(client){
    try{
        await client.connect();
        console.log("Connexion réussie à la base de données");
    }catch(err){
        console.log("Erreur de connexion");
    }
};
  

async function addUser(client){
  try {
      await client.collection("user").insertOne({
        name: "test",
        surname: "test",
        email: "test",
        password: "test",
      });
    console.log("Ajout réussi");
  } catch(err) {
    console.log("Erreur d'ajout");
  }
}


// Export functions 
module.exports = {
    main,
    addUser,
};