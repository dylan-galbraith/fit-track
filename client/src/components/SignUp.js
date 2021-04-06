import errorIcon from '../assets/icons/alert-circle.svg'

function SignUp({ error, signup, login }) {

  return (
    <main className="signup">
      <h1 className="signup__heading">Please Sign Up</h1>
      <form onSubmit={signup} className="signup__form">
        <input className="signup__input" name="firstName" placeholder="First Name *" />
        <input className="signup__input" name="lastName" placeholder="Last Name *" />
        <input className="signup__input" name="username" placeholder="Username *" />
        <input className="signup__input" name="password" placeholder="Password *" type="password" />
        <input className="signup__input" name="confirm" placeholder="Confirm Password *" type="password"/>
        <span className={error ? "signup__error" : "signup__error--hidden"}><img className={error ? "signup__error__icon" : "signup__error__icon--hidden"}  src={errorIcon} alt="error icon" /> This username is already taken</span>
        <button className="signup__button">Sign Up</button>
        <p className="signup__login">Already have an account? <span className="signup__login__link" onClick={login}>Log In</span> </p>
      </form>
    </main>
  )
}

export default SignUp;