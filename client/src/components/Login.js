import errorIcon from '../assets/icons/alert-circle.svg'
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import { API_URL } from '../utils';


function Login({ signUp }) {

  const { login, currentUser } = useAuth();
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('')
      setLoading(true)
      await login(e.target.email.value, e.target.password.value)
      history.push('/')
    } catch {
      setError("Failed to sign in")
    }
    setLoading(false)
  }
  return (
    <main className="login">
      <h1 className="login__heading">Please Log In</h1>
      <form onSubmit={handleSubmit} className="login__form">
        <input className="login__input" name="email" placeholder="Email *" />
        <input className="login__input" name="password" placeholder="Password *" type="password"/>
        <span className={error ? "signup__error" : "signup__error--hidden"}><img className={error ? "signup__error__icon" : "signup__error__icon--hidden"}  src={errorIcon} alt="error icon" /> {error}</span>
        <button disabled={loading} className="login__button">Login</button>
        <p className="login__signup">Don't have an account? <span className="login__signup__link" onClick={signUp}>Sign Up</span> </p>
      </form>
    </main>
  )
}

export default Login;