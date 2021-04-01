
function Login({ signUp, login }) {
  return (
    <main className="login">
      <h1 className="login__heading">Please Log In</h1>
      <form onSubmit={login} className="login__form">
        <input className="login__input" name="username" placeholder="Username" />
        <input className="login__input" name="password" placeholder="Password" type="password"/>
        <button className="login__button">Login</button>
      </form>
      <p>Don't have an account? <span onClick={signUp}>Sign Up</span> </p>
    </main>
  )
}

export default Login;