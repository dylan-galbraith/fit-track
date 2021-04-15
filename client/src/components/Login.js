import errorIcon from '../assets/icons/alert-circle.svg'

function Login({ google, error, signUp, login }) {
  return (
    <main className="login">
      <h1 className="login__heading">Please Log In</h1>
      <form onSubmit={login} className="login__form">
        <input className="login__input" name="username" placeholder="Username *" />
        <input className="login__input" name="password" placeholder="Password *" type="password"/>
        <span className={error ? "signup__error" : "signup__error--hidden"}><img className={error ? "signup__error__icon" : "signup__error__icon--hidden"}  src={errorIcon} alt="error icon" /> Invalid Username or Password</span>
        <button className="login__button">Login</button>
        <p className="login__signup">Don't have an account? <span className="login__signup__link" onClick={signUp}>Sign Up</span> </p>
      </form>
      <button onClick={google}>Google</button>
    </main>
  )
}

export default Login;