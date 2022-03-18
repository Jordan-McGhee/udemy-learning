import useInputNew from "../hooks/useInputNew";

const BasicForm = (props) => {

  // NEED TO:
  // CALL CUSTOM HOOK ON EACH INPUT
  // DETERMINE IF FORM IS VALID OR NOT
  // RENDER ERROR STYLING
  // HANDLE FORM SUBMISSION
  // DISABLE SUBMIT BUTTON UNLESS FORM IS VALID
  // ADD <P> TAGS FOR WHEN ERRORS ARE PRESENT
  // CLEAR FORM ON VALID SUBMISSION

  // FIRST NAME CUSTOM HOOK
  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameValueChangeHandler,
    isTouchedHandler: firstNameIsTouchedHandler,
    resetInput: firstNameResetInput
  } = useInputNew(value => value.trim() !== "")

  // LAST NAME CUSTOM HOOK
  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameValueChangeHandler,
    isTouchedHandler: lastNameIsTouchedHandler,
    resetInput: lastNameResetInput
  } = useInputNew(value => value.trim() !== "")

  // EMAIL CUSTOM HOOK
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailValueChangeHandler,
    isTouchedHandler: emailIsTouchedHandler,
    resetInput: emailResetInput
  } = useInputNew(value => value.trim() !== "" && value.includes("@"))

  let formIsValid = false

  if (firstNameIsValid && lastNameIsValid && emailIsValid) {
    formIsValid = true
  }

  const formSubmissionHandler = event => {
    event.preventDefault()

    if (!formIsValid) {
      return
    }

    firstNameResetInput()
    lastNameResetInput()
    emailResetInput()

  }

  const firstNameInputClasses = !firstNameHasError ? "form-control" : "form-control invalid"
  const lastNameInputClasses = !lastNameHasError ? "form-control" : "form-control invalid"
  const emailInputClasses = !emailHasError ? "form-control" : "form-control invalid"


  return (
    <form onSubmit= { formSubmissionHandler }>

      <div className='control-group'>

        <div className= { firstNameInputClasses }>
          <label htmlFor='name'>First Name</label>
          <input type='text' id='name' onChange= { firstNameValueChangeHandler } onBlur = { firstNameIsTouchedHandler } value = { firstNameValue } />
          { firstNameHasError && <p className="error-text">First name cannot be blank</p> }
        </div>

        <div className= { lastNameInputClasses }>
          <label htmlFor='name'>Last Name</label>
          <input type='text' id='name' onChange= { lastNameValueChangeHandler } onBlur = { lastNameIsTouchedHandler } value = { lastNameValue } />
          { lastNameHasError && <p className="error-text">Last name cannot be blank</p> }
        </div>

      </div>
      
      <div className= { emailInputClasses }>
        <label htmlFor='name'>E-Mail Address</label>
        <input type='text' id='name' onChange= { emailValueChangeHandler } onBlur = { emailIsTouchedHandler } value = { emailValue } />
        { emailHasError && <p className="error-text">Email cannot be blank and must be a valid email.</p> }
      </div>

      <div className='form-actions'>
        <button disabled = { !formIsValid }>Submit</button>
      </div>

    </form>
  );
};

export default BasicForm;
