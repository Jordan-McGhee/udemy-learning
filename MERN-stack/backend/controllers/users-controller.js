const uuid = require("uuid").v4
const { validationResult } = require("express-validator")

const User = require("../models/user")
const HttpError = require("../models/http-error")

const DUMMY_USERS = [
    {
        id: "u1",
        name: "Jordan McGhee",
        email: "test@test.com",
        password: "password"
    },

    {
        id: "u2",
        name: "Tori McGhee",
        email: "test2@test.com",
        password: "password"
    },
]

const getUserList = async (req, res, next) => {
    
    let users

    try {
        users = await User.find({}, "-password")
    } catch (err) {
        const error = new HttpError(
            "Could not get list of users. Please try again.",
            500
        )

        return next(error)
    }

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

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors)
        return next(
            new HttpError(
                "Invalid inputs passed, please check your data.",
                422
            )
        )
    }

    const { name, email, password, places } = req.body

    let existingUser

    try {
        existingUser = await User.findOne({ email: email })
    } catch(err) {
        const error = new HttpError(
            "Signing up failed, please try again later.",
            500
        )

        return next(error)
    }

    if (existingUser) {
        const error = new HttpError(
            "User exists already, please login instead.",
            422
        )

        return next(error)
    }

    const createdUser = new User({
        name,
        email,
        image: "https://picsum.photos/200",
        password,
        places
    })

    try {
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

    const { email, password } = req.body

    let existingUser

    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        const error = new HttpError(
            "Logging in failed, please try again",
            500
        )

        return next(error)
    }

    if (!existingUser || existingUser.password !== password) {
        const error = new HttpError(
            "Invalid credentials, could not log you in.",
            401
        )

        return next(error)
    }

    res.json({ message: `Logged in as ${ existingUser.name }`})
}

exports.getUserList = getUserList
exports.signUp = signUp
exports.userLogin = userLogin