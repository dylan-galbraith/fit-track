import { useState } from 'react';
import errorIcon from '../assets/icons/alert-circle.svg';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';


function SignUp() {

  const { signup, signInWithGoogle, signInWithFacebook, currentUser } = useAuth();
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function google() {
    try {
      setError('')
      setLoading(true)
      await signInWithGoogle()
    } catch {
      setError("Failed to sign up with Google")
    }
    setLoading(false)
  }

  async function facebook() {
    try {
      setError('')
      setLoading(true)
      await signInWithFacebook()
    } catch {
      setError("Failed to sign up with Facebook")
    }
    setLoading(false)
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (e.target.password.value !== e.target.confirm.value) {
      return setError("Passwords do not match")
    }

    if (!e.target.password.value || !e.target.email.value || !e.target.name.value) {
      return setError("Please make sure all fields are filled out")
    }

    try {
      setError('')
      setLoading(true)
      await signup(e.target.email.value, e.target.password.value, e.target.name.value)
      history.push('/')
    } catch {
      setError("Failed to create an account")
    }
    setLoading(false)
  }

  if (currentUser) {
    history.push('/')
  }

  return (
    <main className="signup">
      <h1 className="signup__heading">Please Sign Up</h1>
      <div className="signup__form">
        <form onSubmit={handleSubmit}>
          <input className="signup__input" name="email" placeholder="Email *" />
          <input className="signup__input" name="name" placeholder="Name *" />
          <input className="signup__input" name="password" placeholder="Password *" type="password" />
          <input className="signup__input" name="confirm" placeholder="Confirm Password *" type="password"/>
          <span className={error ? "signup__error" : "signup__error--hidden"}><img className={error ? "signup__error__icon" : "signup__error__icon--hidden"}  src={errorIcon} alt="error icon" />{error}</span>
          <button className="signup__button" disabled={loading}>Sign Up</button>
        </form>
        <p className="signup__login">- OR -</p>
        <button onClick={google} className="signup__button" disabled={loading}>Sign Up With Google</button>
        <button onClick={facebook} className="signup__button" disabled={loading}>Sign Up With Facebook</button>
        <p className="signup__login">Already have an account? <Link to='/login' className="signup__login__link">Log In</Link> </p>
      </div>
    </main>
  )
}

export default SignUp;