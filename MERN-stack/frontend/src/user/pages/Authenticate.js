import React from "react";

import { useForm } from "../../shared/hooks/form-hook";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from "../../shared/util/validators";

import "./Authenticate.css"

const Authenticate = () => {

    const formSubmitHandler = event => {
        event.preventDefault();

        console.log(formState.inputs)

        formState.email = ""
        formState.password = ""
    }

    const [ formState, inputHandler ] = useForm(
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
                    LOGIN
                </Button>
            </form>
        </Card>
    )
}

export default Authenticate