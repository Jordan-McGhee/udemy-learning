const uuid = require("uuid").v4
const { validationResult } = require("express-validator")

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

const HttpError = require("../models/http-error")

const getUserList = ((req, res, next) => {
    res.json({ users : DUMMY_USERS })
})

const signUp = ((req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors)
        
        throw new HttpError("Invalid inputs passed, please check your data.", 422)
    }

    const { name, email, password } = req.body

    const hasUser = DUMMY_USERS.find(u => u.email === email)

    if (hasUser) {
        throw new HttpError("There is already an account with that email", 422)
    }

    const createdUser = {
        id: uuid(),
        name,
        email,
        password
    }

    DUMMY_USERS.push(createdUser)

    res.status(201).json({ user : createdUser })
})

const userLogin = ((req, res, next) => {
    const { email, password } = req.body

    const identifiedUser = DUMMY_USERS.find(u => u.email === email)
    if (!identifiedUser) {
        throw new HttpError("No user with that email", 401)
    } else if (identifiedUser.password !== password) {
        throw new HttpError("Incorrect password", 401)
    }

    res.json({ message : `Logged in as ${identifiedUser.name}` })
})

exports.getUserList = getUserList
exports.signUp = signUp
exports.userLogin = userLogin