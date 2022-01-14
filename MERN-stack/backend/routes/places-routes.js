const express = require("express");
const { check } = require("express-validator");

const placesControllers = require("../controllers/places-controller");
const fileUpload = require("../middleware/file-upload")

const router = express.Router();

router.get("/:placeID", placesControllers.getPlaceById);

router.get("/user/:userID", placesControllers.getPlacesByUserId);

router.post(
    "/",
    fileUpload.single("image"),

    // array of checks using express-validator
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

    // array of checks using express-validator
    [
        check("title")
        .not()
        .isEmpty(),
        check("description")
        .isLength({min: 5})
    ],
    placesControllers.updatePlace
);

router.delete("/:placeID", placesControllers.deletePlace);

module.exports = router;