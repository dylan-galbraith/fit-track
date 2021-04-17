import { useState } from 'react';
import errorIcon from '../assets/icons/alert-circle.svg';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

function UpdateName() {

  const { chooseName } = useAuth();
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('')
      setLoading(true)
      await chooseName(e.target.name.value)

      history.push('/')
    } catch {
      setError("Failed to update name")
    }
    setLoading(false)
  }

  return (
    <main className="signup">
      <h1 className="signup__heading">Choose Your Display Name</h1>
      <form onSubmit={handleSubmit} className="signup__form">
        <input className="signup__input" name="name" placeholder="Display Name *" />
        <span className={error ? "signup__error" : "signup__error--hidden"}><img className={error ? "signup__error__icon" : "signup__error__icon--hidden"}  src={errorIcon} alt="error icon" />{error}</span>
        <button className="signup__button" disabled={loading}>Update</button>
        <p className="signup__login"><Link to='/' className="signup__login__link">Cancel</Link> </p>
      </form>
    </main>
  )
}

export default UpdateName;