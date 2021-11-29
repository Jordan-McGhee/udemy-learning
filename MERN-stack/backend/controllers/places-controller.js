const uuid = require("uuid").v4
const { validationResult } = require("express-validator")
const mongoose = require("mongoose")

const HttpError = require("../models/http-error")
const Place = require("../models/place")
const User = require("../models/user")

const getPlaceById = async (req, res, next) => {
    const placeID = req.params.placeID

    let place

    try{
        place = await Place.findById(placeID)
    } catch(err) {
        const error = new HttpError(
            "Something went wrong, could not find a place", 500
        )
        return next(error)
    } 

    if (!place) {
        const error = new HttpError(
            "Could not find a place for the provided place ID.", 404
        )
        return next(error)
    }

    res.json({ place: place.toObject( { getters: true } ) })
}

const getPlacesByUserId = async (req, res, next) => {
    // CODE BEFORE MONGOOSE

    // const userID = req.params.userID
    // const places = DUMMY_PLACES.filter(p => {
    //     return p.creator === userID
    // })

    // if (!places || places.length === 0) {
    //     return next(new HttpError("Could not find places for the provided user ID.", 404))
    // }

    // res.json({ places })

    let places
    const userID = req.params.userID
    
    try {
        places = await Place.find({ creator : userID })

        // ALTERNATE WAY TO GET USER PLACES WITH .POPULATE()
        // places = await User.findById(userID).populate("places")
    } catch(err) {
        const error = new HttpError(
            "Something went wrong, could not find places created by that user", 500
        )
        return next(error)
    }
    
    if (!places || places.length === 0) {
        return next(new HttpError("Could not find places for the provided User ID"), 404)
    }

    res.json({ places: places.map(place =>
        place.toObject({getters:true}))
    })
}

const createPlace = async (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors)
        return next(
            new HttpError("Invalid inputs passed, please check your data.", 422)
        )
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

    let user
    
    try {
        user = await User.findById(creator)
    } catch(err) {
        const error = new HttpError(
            "Creating place failed, please try again",
            500
        )
        return next(error)
    }

    if (!user) {
        const error = new HttpError(
            "We could not find a user with the provided ID.",
            404
        )
        return next(error)
    }

    console.log(user)

    try{
        const session = await mongoose.startSession()
        session.startTransaction()

        // STEP 1
        await createdPlace.save({ session: session })

        // STEP 2
        user.places.push(createdPlace)

        // STEP 3
        await user.save({ session: session })

        await session.commitTransaction()

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

const updatePlace = async (req, res, next) => {

    // CODE BEFORE MONGOOSE

    // const errors = validationResult(req);

    // if (!errors.isEmpty()) {
    //     console.log(errors)
        
    //     throw new HttpError("Invalid inputs passed, please check your data.", 422)
    // }

    // const { title, description } = req.body
    // const placeID = req.params.placeID
    
    // const updatedPlace = { ...DUMMY_PLACES.find(p => p.id === placeID) }
    // const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeID)

    // updatedPlace.title = title
    // updatedPlace.description = description
    
    // DUMMY_PLACES[placeIndex] = updatedPlace

    // res.status(200).json({place: updatedPlace})

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors)
        return next(
            new HttpError("Invalid inputs passed, please check your data.", 422)
        )
    }

    const { title, description } = req.body
    const placeID = req.params.placeID

    let updatedPlace

    try {
        updatedPlace = await Place.findById(placeID)
    } catch(err) {
        const error = new HttpError(
            "Could not find place. Please try again", 500
        )

        return next(error)
    }

    updatedPlace.title = title
    updatedPlace.description = description

    try {
        await updatedPlace.save()
    } catch(err) {
        const error = new HttpError(
            "Could not update this place's information. Please try again.", 500
        )
    }

    res.status(200).json({ updatedPlace: updatedPlace.toObject({getters:true})})
}

const deletePlace = async (req, res, next) => {

    // CODE BEFORE MONGOOSE

    // const placeID = req.params.placeID

    // if (!DUMMY_PLACES.find(p => p.id === placeID)) {
    //     throw new HttpError(`Could not find place with this id: ${placeID}`, 404)
    // }
    // DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeID)
    // res.status(200).json({ message: "Deleted place."})

    const placeID = req.params.placeID

    let place

    try {
        place = await Place.findById(placeID).populate("creator")
    } catch(err) {
        const error = new HttpError(
            "Something went wrong, could not find that place.", 500
        )

        return next(error)
    }

    if (!place) {
        const error = new HttpError(
            "Could not find place for this ID", 404
        )

        return next(error)
    }

    // console.log(place.creator.places)

    try {
        const session = await mongoose.startSession()
        session.startTransaction()

        await place.remove({ session: session })
        place.creator.places.pull(place)

        await place.creator.save({ session: session })

        await session.commitTransaction()

    } catch(err) {
        const error = new HttpError(
            "Something went wrong, could not delete that place", 500
        )
        return next(error)
    }

    res.status(200).json({ message: "Deleted place."})
}

exports.getPlaceById = getPlaceById
exports.getPlacesByUserId = getPlacesByUserId
exports.createPlace = createPlace
exports.updatePlace = updatePlace
exports.deletePlace = deletePlace