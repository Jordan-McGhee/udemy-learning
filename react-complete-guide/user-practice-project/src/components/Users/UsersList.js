import "./UsersList.css"
import UserItem from "./UserItem"
import Card from "../UI/Card"


const UsersList = (props) => {

    // NEED TO:
        // PASS PROPS TO INDIVIDUAL USER ITEM
        // USE MAP TO POST ALL USERS
        // CASE FOR IF NO USERS

    if (props.users.length === 0) {
        return (
            <Card>
                <h2>No users yet! Add one?</h2>
            </Card>
        )
    }

    return (
        <Card>
            <ul>

                { props.users.map(user => 

                    <UserItem 
                        key = { user.key }
                        username = { user.username }
                        userAge = { user.userAge }
                    />

                )}

            </ul>
        </Card>
    )
}

export default UsersList