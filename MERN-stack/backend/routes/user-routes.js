const express = require("express")
const { check } = require("express-validator")

const userControllers = require("../controllers/users-controller")
const fileUpload = require("../middleware/file-upload")
const router = express.Router()

router.get("/", userControllers.getUserList)

router.post(
    "/signup",
    fileUpload.single('image'),
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