import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import "./PlaceForm.css"
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { AuthContext } from "../../shared/context/auth-context"


// const DUMMY_PLACES = [
//     {
//         id: "p1",
//         title: "Empire State Building",
//         description: "One of the most famous sky scrapers in the world",
//         imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
//         address: '20 W 34th St, New York, NY 10001',
//         location: {
//             lat: 40.7484405,
//             lng: -73.9878584
//         },
//         creator: "u1"
//     },
    
//     {
//         id: 'p2',
//         title: 'Empire State Building',
//         description: 'One of the most famous sky scrapers in the world!',
//         imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
//         address: '20 W 34th St, New York, NY 10001',
//         location: {
//             lat: 40.7484405,
//             lng: -73.9878584
//         },
//         creator: 'u2'
//     }
// ]

const UpdatePlace = () => {

    const auth = useContext(AuthContext)
    const { isLoading, error, sendRequest, clearError } = useHttpClient()
    const [ loadedPlace, setLoadedPlace ] = useState()
    const history = useHistory()

    const placeID = useParams().placeId

    const [ formState, inputHandler, setFormData ] = useForm(
        {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            },
            address: {
                value: '',
                isValid: false
            }

        },
        false
    )

    // const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId)

    useEffect(() => {
        const fetchPlace = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/places/${placeID}`)
                setLoadedPlace(responseData.place)

                setFormData({
                                title: {
                                    value: responseData.place.title,
                                    isValid: true
                                },
                                description: {
                                    value: responseData.place.description,
                                    isValid: true
                                },
                                address: {
                                    value: responseData.place.address,
                                    isValid: true
                                }
                            }, true)
            } catch(err) {

            }
        }

        fetchPlace()
    }, [ sendRequest, placeID, setFormData ])

    // useEffect(() => {
    //     if (identifiedPlace) {
    //         setFormData({
    //             title: {
    //                 value: identifiedPlace.title,
    //                 isValid: true
    //             },
    //             description: {
    //                 value: identifiedPlace.description,
    //                 isValid: true
    //             },
    //             address: {
    //                 value: identifiedPlace.address,
    //                 isValid: true
    //             }
    //         }, true)
    //     }
        
    //     setIsLoading(false)
    // }, [ setFormData, identifiedPlace ])

    const placeUpdateSubmitHandler = async event => {
        event.preventDefault()
        try {
            sendRequest(`http://localhost:5000/api/places/${placeID}`, 'PATCH', JSON.stringify({
                title: formState.inputs.title.value,
                description: formState.inputs.description.value,
                address: formState.inputs.address.value
            }),
            {
                "Content-Type": "application/json"
            })

            history.goBack()
        } catch(err) {

        }
    }

    if (isLoading) {
        return (
            <div className = "center">
                <LoadingSpinner />
            </div>
        )
    }

    if (!loadedPlace && !error) {
        return (
            <div className = "center">
                <Card>
                    <h2>Could not find place!</h2>
                </Card>
            </div>
        )
    }

    return(
        <React.Fragment>
            <ErrorModal error = { error } onClear = { clearError }/>

            { !isLoading && loadedPlace && (
                <form className = "place-form" onSubmit={placeUpdateSubmitHandler}>
                    <Input
                        id="title"
                        element = "input"
                        type = "text"
                        label = "Title"
                        validators = {[VALIDATOR_REQUIRE]}
                        errorText = "Please enter a valid title."
                        onInput = {inputHandler}
                        initialValue = {loadedPlace.title}
                        initialValid = {true}
                    />

                    <Input
                        id="description"
                        element = "textarea"
                        label = "Description"
                        validators = {[VALIDATOR_MINLENGTH]}
                        errorText = "Please enter a valid description (min. 5 characters)."
                        onInput = {inputHandler}
                        initialValue = {loadedPlace.description}
                        initialValid = {true}
                    />

                    <Input
                        id="address"
                        element = "input"
                        type = "text"
                        label = "Address"
                        validators = {[VALIDATOR_REQUIRE]}
                        errorText = "Please enter a valid address."
                        onInput = {inputHandler}
                        initialValue = {loadedPlace.address}
                        initialValid = {true}
                    />

                    <Button type="submit" disabled = {!formState.isValid}>
                        UPDATE PLACE
                    </Button>
                </form>
            )}
        </React.Fragment>
    )
}

export default UpdatePlace