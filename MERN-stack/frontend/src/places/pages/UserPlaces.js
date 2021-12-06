import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import PlaceList from "../components/PlaceList";

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

const UserPlaces = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient()
    const [ loadedPlaces, setLoadedPlaces ] = useState()

    const userID = useParams().userId

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const responseData = await sendRequest(
                    `http://localhost:5000/api/places/user/${userID}`
                )
                setLoadedPlaces(responseData.places)
            } catch(err){}
        }

        fetchPlaces()
    },
        [sendRequest, userID])


    return (
        <React.Fragment>
            <ErrorModal error = { error } onClear = { clearError }/>
            { isLoading && <div>
                <LoadingSpinner asOverlay />
            </div>}
            { !isLoading && loadedPlaces && <PlaceList items = {loadedPlaces} />}
        </React.Fragment>
    )
}

export default UserPlaces