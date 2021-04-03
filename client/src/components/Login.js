
function Login({ signUp, login }) {
  return (
    <main className="login">
      <h1 className="login__heading">Please Log In</h1>
      <form onSubmit={login} className="login__form">
        <input className="login__input" name="username" placeholder="Username *" />
        <input className="login__input" name="password" placeholder="Password *" type="password"/>
        <button className="login__button">Login</button>
        <p className="login__signup">Don't have an account? <span className="login__signup__link" onClick={signUp}>Sign Up</span> </p>
      </form>
    </main>
  )
}

export default Login;