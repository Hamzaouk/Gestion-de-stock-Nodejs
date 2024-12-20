// Définir la classe Product
class Product {
    static nextId = 1; 

    constructor(name, quantity, description, prix) {
        this.id = Product.nextId++; // next id + 1 pour next id 
        this.name = name;
        this.quantity = quantity;
        this.description = description;
        this.prix = prix;
    }
}

module.exports = Product;
