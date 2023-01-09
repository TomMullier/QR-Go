const {MongoClient} = require('mongodb')

class BDD {
  constructor() {
    this.db = null;
    this.connexion();
  }



  connexion() {
    MongoClient.connect("mongodb://0.0.0.0:27017", (err, db) => {
        console.log(err)  
        if (err) throw err;
      console.log("Connexion à la base de données réussie");
      /* -----------------  Pour max pour insérer un utlisateut ----------------- */
      
      this.db = db.db("admin");
      console.log("ici",db);
      
    });
  }

  addUser(){
    this.db.collection("user").insertOne(
        {
          name: "test",
          surname: "test",
          email: "test",
          password: "test",
        },
        (err, res) => {
          if (err) throw err;
          console.log("1 utilisateur inséré");
        //   this.db.close();
        }
      );
  }
}

// Export functions 
module.exports = {
    BDD
};