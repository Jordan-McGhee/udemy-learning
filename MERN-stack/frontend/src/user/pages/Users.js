import React from "react";
import UsersList from "../components/UsersList";

const Users = () => {
    const USERS = [
        {
            id: "u1",
            name: "Jordan McGhee",
            image: "https://picsum.photos/200",
            places: 3,
        }
    ];

    return <UsersList items = {USERS}/>;
};

export default Users;
