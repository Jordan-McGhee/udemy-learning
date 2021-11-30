import React, { useState, useContext } from "react";

import { useForm } from "../../shared/hooks/form-hook";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner"

import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { AuthContext } from "../../shared/context/auth-context";

import "./Authenticate.css"

const Authenticate = () => {

    const auth = useContext(AuthContext)

    const [ isLoginMode, setIsLoginMode ] = useState(true)

    const [ isLoading, setIsLoading ] = useState(false)

    const [ error, setError ] = useState()

    const switchModeHandler = () => {

        if (!isLoginMode) {
            setFormData({
                ...formState.inputs,
                name: undefined
            }, 
                formState.inputs.email.isValid && formState.inputs.password.isValid
            )
        } else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: "",
                    isValid: false
                }
            }, false)
        }

        setIsLoginMode(prevMode => !prevMode)
    }


    // const formSubmitHandler = event => {
    //     event.preventDefault();

    //     console.log(formState.inputs)

    //     auth.login()
    // }

    const formSubmitHandler = async event => {
        event.preventDefault();

        setIsLoading(true)

        if (isLoginMode) {
            
            try {
                // LOGIN MODE
                const response = await fetch("http://localhost:5000/api/users/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value,
                    })
                })

                const responseData = await response.json()
                // console.log(`Response Data: ${responseData.email} ${responseData}`)

                if (!responseData.ok) {
                    console.log("Entered Ok block")
                    throw new Error(responseData.message)
                }

                setIsLoading(false)
                auth.login()

            } catch(err) {
                console.log("Entered catch block block")
                setIsLoading(false)
                setError(err.message || "Something went wrong, please try again.")
            }

        } else {

            try {
                // SIGN IN MODE
                const response = await fetch("http://localhost:5000/api/users/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: formState.inputs.name.value,
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value,
                    })
                })

                const responseData = await response.json()
                console.log(responseData.response)

                if (!responseData.ok) {
                    throw new Error(responseData.message)
                }

                setIsLoading(false)
                auth.login()

            } catch(err) {
                
                setIsLoading(false)
                setError(err.message || "Something went wrong, please try again.")
            }
        }
    }

    const [ formState, inputHandler, setFormData ] = useForm(
        {
            email: {
                value: "",
                isValid: false
            },

            password: {
                value: "",
                isValid: false
            }
        },
        false
    )


    const errorHandler = () => {
        setError(null)
    }

    return(
        <React.Fragment>

            <ErrorModal error = {error} onClear = { errorHandler }/>

            <Card className = "authentication">

                { isLoading && <LoadingSpinner asOverlay/>}

                <h2>Login Required</h2>
                <form onSubmit = {formSubmitHandler}>

                    { !isLoginMode && 
                    <Input 
                        id = "name"
                        element = "input"
                        type = "text"
                        label = "Name"
                        validators = {[ VALIDATOR_REQUIRE ]}
                        errorText = "Please enter a name"
                        onInput = { inputHandler }
                    />}

                    {/* EMAIL INPUT */}
                    <Input
                        id = "email"
                        element = "input"
                        type = "email"
                        label = "Email"
                        validators = {[VALIDATOR_EMAIL]}
                        errorText = "Please enter a valid email"
                        onInput = { inputHandler }
                    />

                    {/* PASSWORD INPUT */}
                    <Input
                        id = "password"
                        element = "input"
                        type = "password"
                        label = "Password"
                        validators = {[VALIDATOR_MINLENGTH(8)]}
                        errorText = "Please enter a valid password (at least 8 characters)"
                        onInput = { inputHandler }
                    />

                    <Button type = "submit" disabled = {!formState.isValid}>
                        { isLoginMode ? "Login" : "Register"}
                    </Button>
                </form>

                <Button inverse onClick = { switchModeHandler }>
                    { isLoginMode ? "Need to Create an Account?" : "Already a User?"}
                </Button>
            </Card>
        </React.Fragment>
    )
}

export default Authenticate