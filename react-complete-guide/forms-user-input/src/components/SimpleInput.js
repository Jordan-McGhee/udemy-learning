// import { useState } from "react";

import useInput from "../hooks/useInput";

const SimpleInput = (props) => {

  // CODE BEFORE CUSTOM HOOK
  // // STATE VERSION FOR NAME INPUT before useInput Hook
  // const [ enteredName, setEnteredName ] = useState("")
  // const [ enteredNameTouched, setEnteredNameTouched ] = useState(false)

  // const enteredNameIsValid = enteredName.trim() !== ""

  // const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched

  // const nameInputChangeHandler = event => {
  //   setEnteredName(event.target.value)
  // }

  // // REF VERSION
  // // const nameInputRef = useRef()

  // const nameInputBlurHandler = event => {
  //   setEnteredNameTouched(true)
  // }


  // // EMAIL STATES
  // const [ enteredEmail, setEnteredEmail ] = useState("")
  // const [ enteredEmailTouched, setEnteredEmailTouched ] = useState(false)

  // const enteredEmailIsValid = enteredEmail.trim() !== "" & enteredEmail.includes("@")
  // const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched

  // const emailInputChangeHandler = event => {
  //   setEnteredEmail(event.target.value)
  // }

  // const emailInputBlurHandler = event => {
  //   setEnteredEmailTouched(true)
  // }

  // NAME CUSTOM HOOK
  const {
    value: enteredName, 
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameInputChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
    resetInput: resetNameInput
  } = useInput(value => value.trim() !== "")

  // EMAIL CUSTOM HOOK
  const {
    value: enteredEmail, 
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailInputChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    resetInput: resetEmailInput
  } = useInput(value => value.trim()!== "" & value.includes("@"))

  let formIsValid = false

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true
    // console.log(`changed form validity: ${formIsValid}`)
  }


  const formSubmissionHandler = event => {
    event.preventDefault()

    // setEnteredNameTouched(true)

    if (!formIsValid) {
      return
    }

    // setEnteredName(true)

    // STATE name before hook
    // console.log(enteredName)
    // setEnteredName("")
    // setEnteredNameTouched(false)

    // email
    // console.log(enteredEmail)
    // setEnteredEmail("")
    // setEnteredEmailTouched(false)

    // REF
    // const enteredValue = nameInputRef.current.value
    // console.log(enteredValue)

    resetNameInput()
    resetEmailInput()
  }

  const nameInputClasses = !nameInputHasError ? 'form-control' : 'form-control invalid'
  const emailInputClasses = !emailInputHasError ? 'form-control' : 'form-control invalid'

  // DEBUGGING CODE FOR ENTERED NAME
  // const enteredNameCheck = () => {
  //   console.log(enteredName)
  // }

  return (
    <form onSubmit= { formSubmissionHandler }>

      {/* NAME INPUT */}
      <div className= { nameInputClasses }>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' onChange = { nameInputChangeHandler } value = { enteredName } onBlur = { nameInputBlurHandler }/>

        { nameInputHasError && <p className =  "error-text">Name must not be empty.</p> }
      </div>

      {/* EMAIL INPUT */}
      <div className= { emailInputClasses }>
        <label htmlFor='name'>Your Email</label>
        <input type='text' id='name' onChange = { emailInputChangeHandler } value = { enteredEmail } onBlur = { emailInputBlurHandler }/>

        { emailInputHasError && <p className =  "error-text">Email must not be empty and must be a valid email.</p> }
      </div>

      <div className="form-actions">
        <button type="submit" disabled = {!enteredNameIsValid}>Submit</button>
        {/* <button onClick = { enteredNameCheck }>check</button> */}
      </div>
    </form>
  );
};

export default SimpleInput;