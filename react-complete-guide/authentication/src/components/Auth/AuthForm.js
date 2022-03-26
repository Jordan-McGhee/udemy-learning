import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

import classes from './AuthForm.module.css';

// const key = "AIzaSyBy8yZwJ5ettMf0quJfkjPK_ofPy7adK0U"

const AuthForm = () => {

  const history = useHistory()

  const emailRef = useRef()
  const passwordRef = useRef()

  const authCtx = useContext(AuthContext)

  const [isLogin, setIsLogin] = useState(true);
  const [ isLoading, setIsLoading ] = useState(false)

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault()

    const userEmail = emailRef.current.value
    const userPassword = passwordRef.current.value

    // ABOUT TO SEND REQUEST SO WE ARE LOADING/SENDING DATA
    setIsLoading(true)

    if (isLogin) {

      // LOGIN SECTION
      // SEND REQUEST TO FIREBASE API AND HANDLE RESPONSE/ERRORS

      fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBy8yZwJ5ettMf0quJfkjPK_ofPy7adK0U",
      {
        method: "POST",
        body: JSON.stringify({
          email: userEmail,
          password: userPassword,
          returnSecureToken: true
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })

      .then(res => {

        setIsLoading(false)

        if (res.ok) {
          console.log("Logged in!")
          return res.json()

        } else {
          // BLOCK TO HANDLE IF THERE WAS AN ERROR
          return res.json().then(data => {
            // show error modal
            let errorMessage = 'Authentication failed'

            if (data && data.error && data.error.message) {
              errorMessage = data.error.message
            }

            throw new Error(errorMessage)
          })
        }

      })
      .then((data) => {
        console.log(data)

        const expirationTime = new Date((new Date().getTime() + (+data.expiresIn * 1000)))

        authCtx.login(data.idToken, expirationTime.toISOString())
        history.replace("/")
      })
      .catch((err) => {
        alert(err.message)
      })

    } else {

      // SIGNUP SECTION
      // SEND REQUEST TO FIREBASE API AND PROVIDE INFO FROM USER INPUT

      fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBy8yZwJ5ettMf0quJfkjPK_ofPy7adK0U",
      {
        method: "POST",
        body: JSON.stringify({
          email: userEmail,
          password: userPassword,
          returnSecureToken: true
        }),
        headers: {
          "Content-Type": 'application/json'
        }
      })
      
      // PROMISE TO HANDLE THE RESPONSE
      .then(res => {

        // NO LONGER LOADING SINCE WE HAVE RESPONSE
        setIsLoading(false)

        if (res.ok) {
          console.log("Signed up!")
          return res.json()

        } else {

          // BLOCK TO HANDLE IF THERE WAS AN ERROR
          return res.json().then(data => {
            // show error modal
            let errorMessage = 'Authentication failed'

            if (data && data.error && data.error.message) {
              errorMessage = data.error.message
            }

            throw new Error(errorMessage)
          })
        }

      })

      .then((data) => {
        console.log(data)
        authCtx.login(data.idToken)
        history.replace("/")
      })
      .catch((err) => {
        alert(err.message)
      })
    }


  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={ submitHandler }>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={ emailRef }/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={ passwordRef }/>
        </div>
        <div className={classes.actions}>
          { !isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button> }
          { isLoading && <p>Sending request...</p>}

          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
