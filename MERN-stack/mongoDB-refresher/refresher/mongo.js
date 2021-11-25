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
        const result = db.collection('products').insertOne(newProduct)
    } catch(error) {
        return res.json({message: "We could not store data."})
    }

    client.close()

    res.json({product: newProduct})
}

const getProducts = async (req, res, next) => {

}

exports.createProduct = createProduct
exports.getProducts = getProducts