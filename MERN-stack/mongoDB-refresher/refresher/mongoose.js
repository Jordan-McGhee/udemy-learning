const mongoose = require("mongoose");

const Product = require("./models/product");

mongoose.connect(
    "mongodb+srv://JordanMcGhee:iGeCma5LrOh9u2J8@cluster0.vvjgg.mongodb.net/products_test?retryWrites=true&w=majority"
).then(() => {
    console.log("Connected to Database")
}).catch(() => {
    console.log("Connection failed")
})

const createProduct = async (req, res, next) => {
    const createdProduct = new Product({
        name: req.body.name,
        price: req.body.price,
    });

    const result = await createdProduct.save()

    res.json(result)
};

const getProducts = async (req, res, next) => {
    const products = await Product.find().exec()

    res.json(products)
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
