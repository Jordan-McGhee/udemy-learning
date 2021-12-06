// const uuid = require("uuid").v4
const { validationResult } = require("express-validator")
const mongoose = require("mongoose")

const User = require("../models/user")
const HttpError = require("../models/http-error")

// const DUMMY_USERS = [
//     {
//         id: "u1",
//         name: "Jordan McGhee",
//         email: "test@test.com",
//         password: "password"
//     },

//     {
//         id: "u2",
//         name: "Tori McGhee",
//         email: "test2@test.com",
//         password: "password"
//     },
// ]

const getUserList = async (req, res, next) => {
    
    // variable for when we query database for all users
    let users

    try {
        // use .find() to get all users in database. {} & "-password" gives us all user objects, but doesn't add passwords to the query. Passing "name email" instead of "-password" would've worked too
        users = await User.find({}, "-password")
    } catch (err) {
        const error = new HttpError(
            "Could not get list of users. Please try again.",
            500
        )

        return next(error)
    }

    // .map() applies .toObject({getters: true}) to each user object in the users array
    res.json({users: users.map(user => user.toObject({getters: true}))})
}

const signUp = async (req, res, next) => {

    // CODE BEFORE MONGOOSE

    // const errors = validationResult(req);

    // if (!errors.isEmpty()) {
    //     console.log(errors)
        
    //     throw new HttpError("Invalid inputs passed, please check your data.", 422)
    // }

    // const { name, email, password } = req.body

    // const hasUser = DUMMY_USERS.find(u => u.email === email)

    // if (hasUser) {
    //     throw new HttpError("There is already an account with that email", 422)
    // }

    // const createdUser = {
    //     id: uuid(),
    //     name,
    //     email,
    //     password
    // }

    // DUMMY_USERS.push(createdUser)

    // ensure the info entered is valid
    const errors = validationResult(req);
    console.log(errors)

    if (!errors.isEmpty()) {
        console.log(errors)
        return next(
            new HttpError(
                "Invalid inputs passed, please check your data.",
                422
            )
        )
    }

    // grab these fields from req body
    const { name, email, password } = req.body

    // variable to store existing user if there is one
    let existingUser

    try {
        // use findOne() to see if there is any User in the database that has the same email
        existingUser = await User.findOne({ email: email })
    } catch(err) {
        const error = new HttpError(
            "Signing up failed, please try again later.",
            500
        )

        return next(error)
    }

    // if existingUser is truthy, return an error since that email is already in the database
    if (existingUser) {
        const error = new HttpError(
            "User exists already, please login instead.",
            422
        )

        return next(error)
    }

    // if not, create a new instance of the User model, have an array for places since this will be changed when this user creates a place
    const createdUser = new User({
        name,
        email,
        image: "https://picsum.photos/200",
        password,
        places: []
    })

    try {
        // save user to database
        await createdUser.save()
    } catch(err) {
        const error = new HttpError(
            "Signing up failed, please try again.",
            500
        )

        return next(error)
    }

    res.status(201).json({ user : createdUser.toObject({ getters: true }) })
}

const userLogin = async (req, res, next) => {

    // CODE BEFORE MONGOOSE

    // const { email, password } = req.body

    // const identifiedUser = DUMMY_USERS.find(u => u.email === email)
    // if (!identifiedUser) {
    //     return next(
    //         new HttpError("No user with that email", 401)
    //     )
    // } else if (identifiedUser.password !== password) {
    //     return next(
    //         new HttpError("Incorrect password", 401)
    //     )
    // }

    // res.json({ message : `Logged in as ${identifiedUser.name}` })

    // grab email and password from the body
    const { email, password } = req.body

    // variable to store query from database
    let existingUser

    try {
        // query database for a user that has the same email
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        const error = new HttpError(
            "Logging in failed, please try again",
            500
        )

        return next(error)
    }

    // if existingUser is falsey or the password doesn't match the password stored for the queried user, return an error
    if (!existingUser || existingUser.password !== password) {
        const error = new HttpError(
            "Invalid credentials, could not log you in.",
            401
        )

        return next(error)
    }

    res.json({
        message: "Logged in!",
        user: existingUser.toObject({ gettters: true })})
}

// functions exported to use in routes
exports.getUserList = getUserList
exports.signUp = signUp
exports.userLogin = userLogin