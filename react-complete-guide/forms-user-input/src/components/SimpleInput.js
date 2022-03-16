import { useState } from "react";

const SimpleInput = (props) => {

  // STATE VERSION FOR NAME INPUT
  const [ enteredName, setEnteredName ] = useState("")
  const [ enteredNameTouched, setEnteredNameTouched ] = useState(false)

  const enteredNameIsValid = enteredName.trim() !== ""

  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched

  const nameInputChangeHandler = event => {
    setEnteredName(event.target.value)
  }

  // REF VERSION
  // const nameInputRef = useRef()

  const nameInputBlurHandler = event => {
    setEnteredNameTouched(true)
  }


  // EMAIL STATES
  const [ enteredEmail, setEnteredEmail ] = useState("")
  const [ enteredEmailTouched, setEnteredEmailTouched ] = useState(false)

  const enteredEmailIsValid = enteredEmail.trim() !== "" & enteredEmail.includes("@")
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched

  const emailInputChangeHandler = event => {
    setEnteredEmail(event.target.value)
  }

  const emailInputBlurHandler = event => {
    setEnteredEmailTouched(true)
  }

  let formIsValid = false

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true
  }


  const formSubmissionHandler = event => {
    event.preventDefault()

    setEnteredNameTouched(true)

    if (!enteredNameIsValid) {
      return
    }

    setEnteredName(true)

    // STATE name
    console.log(enteredName)
    setEnteredName("")
    setEnteredNameTouched(false)

    // email
    console.log(enteredEmail)
    setEnteredEmail("")
    setEnteredEmailTouched(false)

    // REF
    // const enteredValue = nameInputRef.current.value
    // console.log(enteredValue)
  }

  const nameInputClasses = !nameInputIsInvalid ? 'form-control' : 'form-control invalid'
  const emailInputClasses = !emailInputIsInvalid ? 'form-control' : 'form-control invalid'

  return (
    <form onSubmit= { formSubmissionHandler }>

      {/* NAME INPUT */}
      <div className= { nameInputClasses }>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' onChange = { nameInputChangeHandler } value = { enteredName } onBlur = { nameInputBlurHandler }/>

        { nameInputIsInvalid && <p className =  "error-text">Name must not be empty.</p> }
      </div>

      {/* EMAIL INPUT */}
      <div className= { emailInputClasses }>
        <label htmlFor='name'>Your Email</label>
        <input type='text' id='name' onChange = { emailInputChangeHandler } value = { enteredEmail } onBlur = { emailInputBlurHandler }/>

        { emailInputIsInvalid && <p className =  "error-text">Email must not be empty and must be a valid email.</p> }
      </div>

      <div className="form-actions">
        <button disabled = { !formIsValid }>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
