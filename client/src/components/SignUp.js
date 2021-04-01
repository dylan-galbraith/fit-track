
function SignUp({ signup }) {

  return (
    <main className="signup">
      <h1 className="signup__heading">Please Sign Up</h1>
      <form onSubmit={signup} className="signup__form">
        <input className="signup__input" name="firstName" placeholder="First Name" />
        <input className="signup__input" name="lastName" placeholder="Last Name" />
        <input className="signup__input" name="username" placeholder="Username" />
        <input className="signup__input" name="password" placeholder="Password" type="password" />
        <input className="signup__input" name="confirm" placeholder="Confirm Password" type="password"/>
        <button className="signup__button">Sign Up</button>
      </form>
    </main>
  )
}

export default SignUp;