import { useState } from 'react';
import errorIcon from '../assets/icons/alert-circle.svg';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

function UpdateName() {

  const { currentUser, updateName, updateEmail, updatePassword } = useAuth();
  const history = useHistory()

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState(currentUser.displayName)
  const [email, setEmail] = useState(currentUser.email)

  function changeName(e) {
    setName(e.target.value)
  }
  function changeEmail(e) {
    setEmail(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (e.target.password.value !== e.target.confirm.value) {
      return setError("Passwords do not match")
    }

    const promises = []
    setError('')
    setLoading(true)
    if(currentUser.displayName !== name) {
      promises.push(updateName(name))
    }
    if(currentUser.email !== email) {
      promises.push(updateEmail(email))
    }
    if(e.target.password.value) {
      promises.push(updatePassword(e.target.password.value))
    }

    Promise.all(promises)
      .then(()=>{
        history.push('/')
      })
      .catch(()=>{
        setError("Failed to update profile")
      })
      .finally(()=>{
        setLoading(false)
      })
  }

  return (
    <main className="signup">
      <h1 className="signup__heading">Update Profile</h1>
      <form onSubmit={handleSubmit} className="signup__form">
        <input onChange={changeName} className="signup__input" name="name"  placeholder="Name" value={name} />
        <input onChange={changeEmail} className="signup__input" name="email" placeholder="Email" value={email} />
        <input className="signup__input" name="password" placeholder="New Password" type="password" />
        <input className="signup__input" name="confirm" placeholder="Confirm New Password" type="password"  />
        <p className="signup__note">* If password fields are left empty, your password will remain the same.</p>
        <p className="signup__note">* If password is updated, you will be asked to log in again.</p>
        <span className={error ? "signup__error" : "signup__error--hidden"}><img className={error ? "signup__error__icon" : "signup__error__icon--hidden"}  src={errorIcon} alt="error icon" />{error}</span>
        <button className="signup__button" disabled={loading}>Update</button>
        <p className="signup__login"><Link to='/' className="signup__login__link">Cancel</Link> </p>
      </form>
    </main>
  )
}

export default UpdateName;