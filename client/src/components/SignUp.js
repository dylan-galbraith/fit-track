import { useState } from 'react';
import errorIcon from '../assets/icons/alert-circle.svg';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';


function SignUp({ login }) {

  const { signup, currentUser } = useAuth();
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault();

    if (e.target.password.value !== e.target.confirm.value) {
      return setError("Passwords do not match")
    }

    try {
      setError('')
      setLoading(true)
      await signup(e.target.email.value, e.target.password.value)

      history.push('/')
    } catch {
      setError("Failed to create an account")
    }
    setLoading(false)
  }

  return (
    <main className="signup">
      <h1 className="signup__heading">Please Sign Up</h1>
      <form onSubmit={handleSubmit} className="signup__form">
        <input className="signup__input" name="firstName" placeholder="First Name *" />
        <input className="signup__input" name="lastName" placeholder="Last Name *" />
        <input className="signup__input" name="email" placeholder="Email *" />
        <input className="signup__input" name="password" placeholder="Password *" type="password" />
        <input className="signup__input" name="confirm" placeholder="Confirm Password *" type="password"/>
        <span className={error ? "signup__error" : "signup__error--hidden"}><img className={error ? "signup__error__icon" : "signup__error__icon--hidden"}  src={errorIcon} alt="error icon" />{error}</span>
        <button className="signup__button" disabled={loading}>Sign Up</button>
        <p className="signup__login">Already have an account? <span className="signup__login__link" onClick={login}>Log In</span> </p>
      </form>
    </main>
  )
}

export default SignUp;