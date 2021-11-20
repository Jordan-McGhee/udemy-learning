const express = require("express")

const router = express.Router()

const DUMMY_PLACES = [
    {
        id: "p1",
        title: "Empire State Building",
        description: "One of the most famous sky scrapers in the world!",
        location: {
            lat: 40.7484474,
            lng: -74.9871516,
        },
        address: "20 W 34th St, New York, NY 10001",
        creator: "u1"
    },

    {
        id: "p2",
        title: "Empire State Building",
        description: "One of the most famous sky scrapers in the world!",
        location: {
            lat: 40.7484474,
            lng: -74.9871516,
        },
        address: "20 W 34th St, New York, NY 10001",
        creator: "u1"
    },

    {
        id: "p3",
        title: "Empire State Building",
        description: "One of the most famous sky scrapers in the world!",
        location: {
            lat: 40.7484474,
            lng: -74.9871516,
        },
        address: "20 W 34th St, New York, NY 10001",
        creator: "u1"
    },
]

router.get('/:placeID', (req, res, next) => {
    const placeID = req.params.placeID
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeID
    })
    res.json({ place })
})

router.get("/user/:userID", (req, res, next) => {
    const userID = req.params.userID
    const user = DUMMY_PLACES.find(u => {
        return u.creator === userID
    })

    res.json({ user })
})

module.exports = router;