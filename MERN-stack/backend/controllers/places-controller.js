const uuid = require("uuid").v4
const { validationResult } = require("express-validator")

const HttpError = require("../models/http-error")
const Place = require("../models/place")
const dummyCoordinates = require("../util/location")

let DUMMY_PLACES = [
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

const getPlacesByUserId = ((req, res, next) => {
    const userID = req.params.userID
    const places = DUMMY_PLACES.filter(p => {
        return p.creator === userID
    })

    if (!places || places.length === 0) {
        return next(new HttpError("Could not find places for the provided place ID.", 404))
    }

    res.json({ places })
})

const createPlace = async (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors)

        throw new HttpError("Invalid inputs passed, please check your data.", 422)
    }
    
    const { title, description, address, creator } = req.body

    const createdPlace = new Place({
        title,
        description,
        address,
        location: {
            lat: 40.7484474,
            lng: -74.9871516
        },
        image: "https://picsum.photos/200",
        creator
    })

    try{
        await createdPlace.save()
    } catch(err) {
        const error = new HttpError(
            'Creating place failed, please try again',
            500
        )
        console.log(err)
        return next(error)
    }

    res.status(201).json(createdPlace)
}

const updatePlace = ((req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors)
        
        throw new HttpError("Invalid inputs passed, please check your data.", 422)
    }

    const { title, description } = req.body
    const placeID = req.params.placeID
    
    const updatedPlace = { ...DUMMY_PLACES.find(p => p.id === placeID) }
    const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeID)

    updatedPlace.title = title
    updatedPlace.description = description
    
    DUMMY_PLACES[placeIndex] = updatedPlace

    res.status(200).json({place: updatedPlace})
})

const deletePlace = ((req, res, next) => {
    const placeID = req.params.placeID

    if (!DUMMY_PLACES.find(p => p.id === placeID)) {
        throw new HttpError(`Could not find place with this id: ${placeID}`, 404)
    }
    DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeID)
    res.status(200).json({ message: "Deleted place."})
})

exports.getPlaceById = getPlaceById
exports.getPlacesByUserId = getPlacesByUserId
exports.createPlace = createPlace
exports.updatePlace = updatePlace
exports.deletePlace = deletePlace