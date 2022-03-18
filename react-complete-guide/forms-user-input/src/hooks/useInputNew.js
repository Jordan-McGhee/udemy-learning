import { useState } from "react"

const useInputNew = (validateValue) => {

    // NEED TO HAVE STATES FOR ENTERED VALUE AND BLUR
    // HANDLER FUNCTIONS FOR WHEN THE VALUE IS CHANGED AND BLUR
    // NEED IS VALID AND HAS ERROR VARIABLES
    // HANDLER TO RESET INPUT

    // These states keep track of what the user is typing and also when a user clicks out of the input box. Will help with errors
    const [ enteredValue, setEnteredValue ] = useState("")
    const [ isTouched, setIsTouched ] = useState(false)

    const isValid = validateValue(enteredValue)
    const hasError = !isValid && isTouched

    // updates value state on each keystroke
    const valueChangeHandler = (event) => {
        setEnteredValue(event.target.value)
    }

    // updates touch/blur state
    const isTouchedHandler = () => {
        setIsTouched(true)
    }

    // clears input
    const resetInput = () => {
        setEnteredValue("")
    }

    return {
        value: enteredValue,
        isValid,
        hasError,
        valueChangeHandler,
        isTouchedHandler,
        resetInput
    }
}

export default useInputNew