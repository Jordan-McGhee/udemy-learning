const express = require("express")

const placesControllers = require("../controllers/places-controller")

const router = express.Router()

router.get('/:placeID', placesControllers.getPlaceById)

router.get("/user/:userID", placesControllers.getPlaceByUserId)

router.post("/", placesControllers.createPlace)

module.exports = router;