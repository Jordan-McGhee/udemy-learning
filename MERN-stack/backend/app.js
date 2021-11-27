const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const password = "FPe9Me4254QVi4w"
const url = "mongodb+srv://JordanMcGhee:FPe9Me4254QVi4w@mern.xbi7o.mongodb.net/MERN-course?retryWrites=true&w=majority"

const placesRoutes = require("./routes/places-routes")
const usersRoutes = require("./routes/user-routes")
const HttpError = require("./models/http-error")

const app = express()

app.use(bodyParser.json())

app.use("/api/places", placesRoutes)

app.use("/api/users", usersRoutes)

app.use((req, res, next) => {
    throw new HttpError("Could not find this route.", 404)
})

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }

    res.status(error.code || 500);
    res.json({message: error.message || "An unknown error occurred!"});
})

mongoose
    .connect(url)
    .then(() => {
        app.listen(5000)
    })
    .catch(err => {
        console.log(err)
    })