const express = require("express")

const placesControllers = require("../controllers/places-controller")

const router = express.Router()

router.get('/:placeID', placesControllers.getPlaceById)

router.get("/user/:userID", placesControllers.getPlacesByUserId)

router.post("/", placesControllers.createPlace)

router.patch("/:placeID", placesControllers.updatePlace)

router.delete("/:placeID", placesControllers.deletePlace)

module.exports = router;