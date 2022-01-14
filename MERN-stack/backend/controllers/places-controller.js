const uuid = require("uuid").v4
const { validationResult } = require("express-validator")
const mongoose = require("mongoose")

const HttpError = require("../models/http-error")
const Place = require("../models/place")
const User = require("../models/user")

const getPlaceById = async (req, res, next) => {
    // grab the place ID from the url
    const placeID = req.params.placeID

    // establish place variable to use below
    let place

    // try/catch block to either find a place or return error that says it was unsuccessful
    try{
        // await because interacting with database can be slow, therefore needs to be asynchronous
        place = await Place.findById(placeID)
    } catch(err) {
        const error = new HttpError(
            "Something went wrong, could not find a place", 500
        )
        return next(error)
    } 

    // if the place variable is falsey, there wasn't a place with that ID, so return an error 
    if (!place) {
        const error = new HttpError(
            "Could not find a place for the provided place ID.", 404
        )
        return next(error)
    }

    // return a JSON response with the place
    // .toObject() converts the mongoose object to a POJO, getters: true gives us id without the underscore before
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

    // create variable for places to use later and grab userID from url
    let places
    const userID = req.params.userID
    
    try {
        // use the place model and mongoose's .find() method to find all places where the creator matches the userID
        places = await Place.find({ creator : userID })

        // ALTERNATE WAY TO GET USER PLACES WITH .POPULATE()
        // places = await User.findById(userID).populate("places")
    } catch(err) {
        const error = new HttpError(
            "Something went wrong, could not find places created by that user", 500
        )
        return next(error)
    }
    
    // check if the places array is empty or falsey
    if (!places || places.length === 0) {
        return next(new HttpError("Could not find places for the provided User ID"), 404)
    }

    // similar response returned, but use .map() to apply .toObject({getters:true}) to each place
    res.json({ places: places.map(place =>
        place.toObject({getters:true}))
    })
}

const createPlace = async (req, res, next) => {

    // use imported validationResult to check if there are any errors in the info passed in the create place form
    const errors = validationResult(req);

    // check if there were any errors
    if (!errors.isEmpty()) {
        console.log(errors)
        return next(
            new HttpError("Invalid inputs passed, please check your data.", 422)
        )
    }
    
    // if there were no errors, grab the fields from the form body
    const { title, description, address, creator } = req.body

    // create new instance of place with the variables established above
    // don't need title: title if the key/value have the same name
    // hard-coded location lat/lng and image for easier setup
    const createdPlace = new Place({
        title,
        description,
        address,
        location: {
            lat: 40.7484474,
            lng: -74.9871516
        },
        image: req.file.path,
        creator
    })

    // create variable to store user once we communicate with database
    let user
    
    try {
        // find the correct user by passing in the creator to the User model
        user = await User.findById(creator)
    } catch(err) {
        const error = new HttpError(
            "Creating place failed, please try again",
            500
        )
        return next(error)
    }

    // if user is falsey, return an error before moving forward with creating the place
    if (!user) {
        const error = new HttpError(
            "We could not find a user with the provided ID.",
            404
        )
        return next(error)
    }

    console.log(user)

    try{
        // in order to save multiple things to the database, we use session and transaction
        // this ensures that everything is successful before saving incomplete/incorrect data to the database

        // start the session and transaction
        const session = await mongoose.startSession()
        session.startTransaction()

        // STEP 1 save the newly created place, making sure to pass the current session as a property
        await createdPlace.save({ session: session })

        // STEP 2 add the newly created place to the queried user's array of places
        user.places.push(createdPlace)

        // STEP 3 save the updated user, making sure to pass the current session as a property
        await user.save({ session: session })

        // this commits the changes if everything was successful
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

    // make sure there are no errors with the given information
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors)
        return next(
            new HttpError("Invalid inputs passed, please check your data.", 422)
        )
    }

    // grab the necessary properties from the form and grab place ID from the URL
    const { title, description, address } = req.body
    const placeID = req.params.placeID

    // establish variable for when we query database with the place ID
    let updatedPlace

    try {
        // query to find place by ID
        updatedPlace = await Place.findById(placeID)
    } catch(err) {
        const error = new HttpError(
            "Could not find place. Please try again", 500
        )

        return next(error)
    }

    // update the place's title and description to the values we pulled from the req.body
    updatedPlace.title = title
    updatedPlace.description = description
    updatedPlace.address = address

    try {
        // await saving the updated place to the database
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

    // grab place ID from url
    const placeID = req.params.placeID

    // create variable to store Place from the database
    let place

    try {
        // find the correct place by its ID. Populate is a mongoose method that ties this to the User model since it is attached with the ref property in the Place schema/model
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

        // need a session/transaction here since we will be removing the place from the database and updating the user object's array that is associated with that place  
        const session = await mongoose.startSession()
        session.startTransaction()

        // remove the place from the database and pass in the current session
        await place.remove({ session: session })
        place.creator.places.pull(place)

        // using place.creator, save the updated user to the database. Since these are asynchronous, order doesn't matter here
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

// functions exported for use in places-routes.js
exports.getPlaceById = getPlaceById
exports.getPlacesByUserId = getPlacesByUserId
exports.createPlace = createPlace
exports.updatePlace = updatePlace
exports.deletePlace = deletePlace