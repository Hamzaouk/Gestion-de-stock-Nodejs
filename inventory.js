// Importer readline module
const readline = require("readline");
const Product = require("./product"); // Import the Product class

// Configurer les entrées/sorties
const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

class Inventory {
    
    menu() {
        console.log("\n--- Menu ---\n");
        console.log("1. Ajouter un produit au stock");
        console.log("2. Afficher tous les produits en stock");
        console.log("3. Mettre à jour un produit");
        console.log("4. Supprimer un produit du stock");
        console.log("5. Quitter");
        read.question("Choisissez une option: ", (choix) => this.gererChoix(choix));
    }


}