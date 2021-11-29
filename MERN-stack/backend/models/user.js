const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    image: { type: String, required: true },

    // since this ties to another model, need to use this type and add a ref to the place model
    // also is an array since a user can have multiple places
    places: [{ type: mongoose.Types.ObjectId, required: true, ref: "Place" }]
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model("User", userSchema)