import React, { useState, useContext } from "react";

import { useForm } from "../../shared/hooks/form-hook";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { AuthContext } from "../../shared/context/auth-context";

import "./Authenticate.css"

const Authenticate = () => {

    const auth = useContext(AuthContext)

    const [ isLoginMode, setIsLoginMode ] = useState(true)

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


    const formSubmitHandler = event => {
        event.preventDefault();

        console.log(formState.inputs)

        auth.login()
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

    return(
        <Card className = "authentication">
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
    )
}

export default Authenticate