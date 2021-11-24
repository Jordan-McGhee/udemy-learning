const express = require("express")
const { check } = require("express-validator")

const userControllers = require("../controllers/users-controller")
const router = express.Router()

router.get("/", userControllers.getUserList)

router.post("/signup",
    [
        check("name")
        .not(),
        check("email")
        .normalizeEmail()
        .isEmail(),
        check("password")
        .isLength({min: 6})
    ],
    userControllers.signUp)

router.post("/login", userControllers.userLogin)

module.exports = router