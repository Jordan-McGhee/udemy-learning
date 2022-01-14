const fs = require("fs")
const path = require("path")

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

app.use('/uploads/images', express.static(path.join("uploads", "images")))

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept, Authorization")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE")
    
    next()
})

app.use("/api/places", placesRoutes)

app.use("/api/users", usersRoutes)

app.use((req, res, next) => {
    throw new HttpError("Could not find this route.", 404)
})

// If we reach this middleware, that means we haven't returned a response on any of the above middleware routes
app.use((error, req, res, next) => {

    if (req.file) {
        fs.unlink(req.file.path, (err) => {
            console.log(err)
        })
    }

    if (res.headerSent) {
        return next(error);
    }

    // set the status and message unless there is one attached already
    res.status(error.code || 500);
    res.json({message: error.message || "An unknown error occurred!"});
})

mongoose
    // Connect to MongoDB database at above URL
    .connect(url)
    // listen to the localhost serve
    .then(() => {
        app.listen(5000)
    })
    // log on any errors
    .catch(err => {
        console.log(err)
    })