const express = require("express");
const { check } = require("express-validator");

const placesControllers = require("../controllers/places-controller");

const router = express.Router();

router.get("/:placeID", placesControllers.getPlaceById);

router.get("/user/:userID", placesControllers.getPlacesByUserId);

router.post("/",
    [
        check("title")
            .not()
            .isEmpty(),
        check("description")
            .isLength({min: 5}),
        check("address")
            .not()
            .isEmpty()
    ],
    placesControllers.createPlace
);

router.patch("/:placeID",
[
    check("title")
    .not()
    .isEmpty(),
    check("description")
    .isLength({min: 5})
],
placesControllers.updatePlace);

router.delete("/:placeID", placesControllers.deletePlace);

module.exports = router;
