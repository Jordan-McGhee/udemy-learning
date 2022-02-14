import "./UserItem.css"

const UserItem = (props) => {
    return (

        <li>
            <h2>{ props.username }</h2>
            <h6>{ props.userAge }</h6>
        </li>

    )
}

export default UserItem