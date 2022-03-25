import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const key = "AIzaSyBy8yZwJ5ettMf0quJfkjPK_ofPy7adK0U"

const AuthForm = () => {

  const emailRef = useRef()
  const passwordRef = useRef()

  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault()

    const userEmail = emailRef.current.value
    const userPassword = passwordRef.current.value

    if (isLogin) {

    } else {
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
      }).then(res => {
        if (res.ok) {

        } else {
          return res.json().then(data => {
            // show error modal
            console.log(data)
          })
        }

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
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
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
