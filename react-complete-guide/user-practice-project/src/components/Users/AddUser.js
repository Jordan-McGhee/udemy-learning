import { useState } from "react"
import Card from "../UI/Card"
import "./AddUser.css"

const AddUser = (props) => {

    // states & functions to store user inputs
    const [ username, setUsername] = useState('')
    const [ userAge, setUserAge ] = useState('')

    const usernameChangeHandler = (event) => {
        setUsername(event.target.value)
    }

    const userAgeChangeHandler = (event) => {
        setUserAge(event.target.value)
    }

    // function to prevent form from submitting and pass data to App.js through props
    const addUserHandler = (event) => {
        event.preventDefault()

        const formData = {
            key: Math.random().toString(),
            username,
            userAge
        }

        props.onAddUser(formData)

        setUsername("")
        setUserAge("")
    }

    return (
        
        <Card>

            <form onSubmit = { addUserHandler }>

                <div className = "input">
                    <label htmlFor = "username">Username</label>
                    <input id = "username" type = "text" value = { username } onChange = { usernameChangeHandler }/>
                </div>

                <div className = "input">
                    <label htmlFor = "age">Age</label>
                    <input id = "age" type = "number" step = "1" value = { userAge } onChange = { userAgeChangeHandler }/>
                </div>

                <button type = "submit">Add User</button>

            </form>

        </Card>

    )
}

export default AddUser