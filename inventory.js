const readline = require("readline");
const Product = require("./product"); // Import the Product class

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
                console.log("Merci, au revoir!");
                read.close();
                break;
            default:
                console.log("Option invalide. Veuillez réessayer.");
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

    updateProduct() {
        read.question("Entrez l'ID du produit à mettre à jour: ", (id) => {
            const productId = parseInt(id);
            const product = this.products.find((p) => p.id === productId);

            if (!product) {
                console.log("Produit introuvable.");
                this.menu();
                return;
            }

            read.question("Nouveau nom (laisser vide pour conserver l'ancien): ", (name) => {
                read.question("Nouvelle quantité (laisser vide pour conserver l'ancienne): ", (quantity) => {
                    read.question("Nouvelle description (laisser vide pour conserver l'ancienne): ", (description) => {
                        read.question("Nouveau prix (laisser vide pour conserver l'ancien): ", (prix) => {
                            if (name) product.name = name;
                            if (quantity) {
                                const quantityNumber = parseFloat(quantity);
                                if (!isNaN(quantityNumber) && quantityNumber > 0) {
                                    product.quantity = quantityNumber;
                                } else {
                                    console.log("Quantité invalide.");
                                }
                            }
                            if (description) product.description = description;
                            if (prix) {
                                const prixNumber = parseFloat(prix);
                                if (!isNaN(prixNumber) && prixNumber > 0) {
                                    product.prix = prixNumber;
                                } else {
                                    console.log("Prix invalide.");
                                }
                            }

                            console.log("Produit mis à jour avec succès!");
                            this.menu();
                        });
                    });
                });
            });
        });
    }

    deleteProduct() {
        read.question("Entrez l'ID du produit à supprimer: ", (id) => {
            const productId = parseInt(id);
            const index = this.products.findIndex((p) => p.id === productId);

            if (index === -1) {
                console.log("Produit introuvable.");
            } else {
                this.products.splice(index, 1);
                console.log("Produit supprimé avec succès!");
            }

            this.menu();
        });
    }
}

// commencer le programme
const inventory = new Inventory();
inventory.menu();
