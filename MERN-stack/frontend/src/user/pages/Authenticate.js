import React, { useState, useContext } from "react";

import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner"
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { AuthContext } from "../../shared/context/auth-context";

import "./Authenticate.css"

const Authenticate = () => {

    const auth = useContext(AuthContext)

    const [ isLoginMode, setIsLoginMode ] = useState(true)

    const { isLoading, error, sendRequest, clearError } = useHttpClient()

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

        if (isLoginMode) {
            
            // LOGIN MODE

            try {

                const responseData = await sendRequest(
                    // URL
                    "http://localhost:5000/api/users/login", 
                    
                    // METHOD
                    "POST",

                    // BODY
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    }),

                    // HEADERS
                    {
                        "Content-Type": "application/json"
                    }
                )
                
                //  THIS CODE BELOW IS DONE INSIDE HOOK
                // const responseData = await response.json()
    
                // if(!response.ok) {
                //     throw new Error(responseData.message)
                // }
    
                // setIsLoading(false)

                auth.login(responseData.user._id)
                console.log(responseData.user._id)
            } catch(err) {
                // don't need anything here because it's handled in the hook. Can be left blank

            }
        
        } else {

            // SIGN IN MODE

            try {
                const responseData = await sendRequest(
                    // URL
                    "http://localhost:5000/api/users/signup",

                    // METHOD
                    "POST",

                    // BODY
                    JSON.stringify({
                        name: formState.inputs.name.value,
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    }),

                    // HEADERS
                    {
                        "Content-Type": "application/json"
                    }
                )

                //  THIS CODE BELOW IS DONE INSIDE HOOK
                // const responseData = await response.json()
                // console.log(responseData)

                // if(!response.ok) {
                //     throw new Error(responseData.message)
                // }

                // setIsLoading(false)

                auth.login(responseData.user._id)
                console.log(responseData.user._id)

            } catch(err) {

                // don't need anything here because it's handled in the hook. Can be left blank. Below is old code before the hook

                // console.log(err)
                // setIsLoading(false)
                // setError(err.message || "Something went wrong, please try again.")
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


    // const errorHandler = () => {
    //     setError(null)
    // }

    return(
        <React.Fragment>

            <ErrorModal error = {error} onClear = { clearError }/>

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

                    {/* IMAGE INPUT */}
                    { !isLoginMode && 
                    <ImageUpload
                        center
                        id= "image"
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