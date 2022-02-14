import "./UserItem.css"

const UserItem = (props) => {
    return (

        <li className = "user-item">
            <h3>{ props.username } ({props.userAge} years old)</h3>
        </li>

    )
}

export default UserItem