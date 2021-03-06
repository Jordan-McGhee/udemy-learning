const MongoClient = require("mongodb").MongoClient

const url = "mongodb+srv://JordanMcGhee:iGeCma5LrOh9u2J8@cluster0.vvjgg.mongodb.net/products_test?retryWrites=true&w=majority"

const createProduct = async (req, res, next) => {
    const newProduct = {
        name: req.body.name,
        price: req.body.price
    }

    const client = new MongoClient(url)

    try {
        await client.connect()
        const db = client.db()
        const result = await db.collection('products').insertOne(newProduct)
    } catch(error) {
        return res.json({message: "We could not store data."})
    }

    client.close()

    res.json({product: newProduct})
}

const getProducts = async (req, res, next) => {
    const client = new MongoClient(url)

    let products

    try {
        await client.connect()
        const db = client.db()
        products = await db.collection("products").find().toArray()
    } catch (error) {
        return res.json({message: "Could not get products."})
    }

    client.close()

    res.json(products)
}

exports.createProduct = createProduct
exports.getProducts = getProducts