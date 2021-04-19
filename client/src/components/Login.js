import errorIcon from '../assets/icons/alert-circle.svg'
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom'

function Login() {

  const { login, signInWithGoogle, signInWithFacebook, currentUser } = useAuth();
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function google() {
    try {
      setError('')
      setLoading(true)
      await signInWithGoogle()
    } catch {
      setError("Failed to log in with Google")
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

  if(currentUser) {
    history.push('/')
  }

  return (
    <main className="login">
      <h1 className="login__heading">Please Log In</h1>
      <div className="login__form">
        <form onSubmit={handleSubmit}>
          <input className="login__input" name="email" placeholder="Email *" />
          <input className="login__input" name="password" placeholder="Password *" type="password"/>
          <span className={error ? "signup__error" : "signup__error--hidden"}><img className={error ? "signup__error__icon" : "signup__error__icon--hidden"}  src={errorIcon} alt="error icon" /> {error}</span>
          <button disabled={loading} className="login__button">Login</button>
        </form>
        <p className="login__signup">- OR -</p>
        <button onClick={google} disabled={loading} className="login__button">Login With Google</button>
        <button onClick={facebook} disabled={loading} className="login__button">Login With Facebook</button>
        <p className="login__signup">Don't have an account? <Link to='/signup' className="login__signup__link">Sign Up</Link> </p>
      </div>
    </main>
  )
}

export default Login;