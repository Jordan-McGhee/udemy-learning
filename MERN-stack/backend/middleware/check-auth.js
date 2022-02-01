const HttpError = require("../models/http-error")
const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {

    if (req.method === "OPTIONS") {
        return next()
    }

    try{
        const token = req.headers.authorization.split(" ")[1]

        if (!token) {
            throw new Error("Authentication failed - check-auth.js")
        }

        const decodedToken = jwt.verify(token, process.env.JTW_KEY)
        req.userData = {
            userID: decodedToken.userID
        }
        
        next()

    } catch(err) {
        const error = new HttpError("Authentication failed - check-auth.js", 403)
        return next(error)
    }



}