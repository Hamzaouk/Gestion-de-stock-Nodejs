// Importer readline module
const readline = require("readline");
const Product = require("./product"); // Import the Product class

// Configurer les entrées/sorties
const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

class Inventory {
    constructor() {
        this.products = []; // Array pour les produits
    }
    menu() {
        console.log("\n--- Menu ---\n");
        console.log("1. Ajouter un produit au stock");
        console.log("2. Afficher tous les produits en stock");
        console.log("3. Mettre à jour un produit");
        console.log("4. Supprimer un produit du stock");
        console.log("5. Quitter");
        read.question("Choisissez une option: ", (choix) => this.gererChoix(choix));
    }

    gererChoix(choix) {
        switch (choix) {
            case "1":
                this.addProduct();
                break;
            case "2":
                this.listProducts();
                break;
            case "3":
                this.updateProduct();
                break;
            case "4":
                this.deleteProduct();
                break;
            case "5":
                console.log("Au revoir");
                read.close();
                break;
            default:
                console.log("Option invalide.");
                this.menu();
        }
    }
    addProduct() {
        read.question("Nom du produit: ", (name) => {
            read.question("Quantité du produit: ", (quantity) => {
                read.question("Description du produit: ", (description) => {
                    read.question("Prix du produit: ", (prix) => {
                        const quantityNumber = parseFloat(quantity);
                        const prixNumber = parseFloat(prix);

                        if (!name || typeof name !== "string") {
                            console.log("Erreur : Nom invalide.");
                            this.menu();
                            return;
                        }
                        if (isNaN(quantityNumber) || quantityNumber <= 0) {
                            console.log("Erreur : Quantité doit être un nombre positif.");
                            this.menu();
                            return;
                        }
                        if (isNaN(prixNumber) || prixNumber <= 0) {
                            console.log("Erreur : Prix doit être un nombre positif.");
                            this.menu();
                            return;
                        }

                        const product = new Product(name, quantityNumber, description, prixNumber);
                        this.products.push(product);
                        console.log("Produit ajouté avec succès!");
                        this.menu();
                    });
                });
            });
        });
    }

    listProducts() {
        if (this.products.length === 0) {
            console.log("Aucun produit en stock.");
        } else {
            console.log("\nProduits en stock:");
            this.products.forEach((product, index) => {
                console.log(`\nProduit ${index + 1}:`);
                console.log(`ID: ${product.id}`);
                console.log(`Nom: ${product.name}`);
                console.log(`Quantité: ${product.quantity}`);
                console.log(`Description: ${product.description}`);
                console.log(`Prix: ${product.prix}`);
            });
        }
        this.menu();
    }


}
// commencer le programme
const inventory = new Inventory();
inventory.menu();