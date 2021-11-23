const HttpError = require("../models/http-error")

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

const getPlaceById = ((req, res, next) => {
    const placeID = req.params.placeID
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeID
    })

    if (!place) {
        throw new HttpError("Could not find a place for the provided place ID.", 404)
    }

    res.json({ place })
})

const getPlaceByUserId = ((req, res, next) => {
    const userID = req.params.userID
    const place = DUMMY_PLACES.find(u => {
        return u.creator === userID
    })

    if (!place) {
        return next(new HttpError("Could not find a place for the provided place ID.", 404))
    }

    res.json({ place })
})

exports.getPlaceById = getPlaceById
exports.getPlaceByUserId = getPlaceByUserId