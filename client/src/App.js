import './App.scss'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Component } from 'react'
import axios from 'axios';
import { API_URL } from './utils';
import PrivateRoute from './components/PrivateRoute';

import Footer from './components/Footer'
import Home from './pages/home/Home'
import Exercises from './pages/exercises/Exercises'
import SingleExercise from './pages/exercises/SingleExercise'
import Routines from './pages/routines/Routines'
import SingleRoutine from './pages/routines/SingleRoutine';
import Favourites from './pages/favourites/Favourites';
import AddExercise from './pages/exercises/AddExercise';
import AddRoutine from './pages/routines/AddRoutine';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { AuthProvider } from './contexts/AuthContext';

class App extends Component {

  state = {
    isLoggedIn: false,
    signUp: false,
    errorMessage: null,
    user: null,
    exercises: null,
    routines: null,
    isLoading: true,
    error: false,

    info: {
      exercises: [],
      routines: []
    },
    loggedIn: false
  }

  handleGoogle = (e) => {
    e.preventDefault();
    axios
      .get(`${API_URL}/auth/google`)
      .then(response => {
        console.log(response);
      })
  }

  handleLogin = (e) => {
    e.preventDefault();
    const user = {
      username: e.target.username.value,
      password: e.target.password.value
    }
    axios
      .post(`${API_URL}/login`, user)
      .then(response => {
        if (response.status === 200) {
          sessionStorage.setItem("authToken", response.data.token);
          this.setState({
            isLoggedIn: true,
            user: response.data.user,
            exercises: response.data.user.exercise,
            routines: response.data.user.routine
          })
        } else (
          this.setState({
            error: true
          })
        )
      })
      .catch(err => {
        this.setState({
          error: true
        })
      })
  }

  startSignUp = (e) => {
    this.setState({
      signUp: true
    })
  }
  startLogin = (e) => {
    this.setState({
      signUp: false
    })
  }

  handleSignUp = (e) => {
    e.preventDefault();
    if(e.target.password.value !== e.target.confirm.value) {
      return
    }
    const newUser = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      username: e.target.username.value,
      password: e.target.password.value
    }
    axios
      .post(`${API_URL}/signup`, newUser)
      .then(response => {
        if(response.status === 200) {
          axios
          .post(`${API_URL}/login`, newUser)
          .then(response => {
            if (response.status === 200) {
              sessionStorage.setItem("authToken", response.data.token);
    
              this.setState({
                isLoggedIn: true,
                user: response.data.user,
                exercises: response.data.user.exercise,
                routines: response.data.user.routine
              })
            }
          })
        }
      })
      .catch(err => {
        this.setState({
          error: true
        })
      })
  }

  getData = async () => {
    try {
      const exercises = await axios.get(`${API_URL}/exercises/all/20`)
      const routines = await axios.get(`${API_URL}/routines/all/20`)
      return {exercises: exercises.data, routines: routines.data}
    } catch {
      console.log("error");
    }
  }
  componentDidMount = () => {
    // const token = sessionStorage.getItem("authToken");
    // axios
    //   .get(`${API_URL}/profile`, {
    //     headers: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   })
    //   .then(response => {
    //     if (response.status === 200) {
    //       this.setState({
    //         isLoggedIn: true,
    //         user: response.data,
    //         exercises: response.data.exercise,
    //         routines: response.data.routine,
    //         isLoading: false
    //       })
    //     }
    //   })
    //   .catch (err => {
    //     this.setState({
    //       isLoading: false
    //     })
    //   })
  }

  render() {
    // if(this.state.isLoading) 
    // return (
    //   <div className="app">
    //     <p>Loading...</p>
    //   </div>
    // ) 
    return (
      <div className="app">
        <BrowserRouter>
          <AuthProvider>
            <Switch>
              <PrivateRoute path='/' exact component={()=> <Home getData={this.getData} />} />
              <PrivateRoute path='/routines' exact component={()=> <Routines getData={this.getData} />} />
              <Route path='/signup' component={SignUp} />
              <Route path='/login' component={Login} />
            </Switch>
            <Footer resetExercises={this.resetExercises} resetRoutines={this.resetRoutines} logout={this.handleLogOut}/>
          </AuthProvider>
        </BrowserRouter>
      </div>
    )

    // if (!this.state.isLoggedIn) {
    //   return (
    //     <div className="app">
    //       <AuthProvider>
    //         <SignUp error={this.state.error} signupOld={this.handleSignUp} login={this.startLogin}  />
    //       </AuthProvider>
    //     </div>
    //   )
    // }

    // return (
    //   <div className="app">
    //     <BrowserRouter>
    //       <Switch>
    //         <Route path='/' exact > <Home user={this.state.user} routines={this.state.routines} exercises={this.state.exercises}/> </Route>
    //         <Route path='/exercises/add' > <AddExercise exercises={this.state.exercises} userId={this.state.user.id} resetExercises={this.resetExercises} /> </Route>
    //         <Route path='/exercises/:exerciseId' component={SingleExercise} />
    //         <Route path='/routines' exact > <Routines routines={this.state.routines} resetRoutines={this.resetRoutines} /> </Route>
    //         <Route path='/routines/add' > <AddRoutine routines={this.state.routines} userId={this.state.user.id}  resetRoutines={this.resetRoutines}/> </Route>
    //         <Route path='/routines/:routineId' component={SingleRoutine} />
    //         <Route path='/favourites' > <Favourites exercises={this.state.exercises} /> </Route>
    //       </Switch>
    //       <Footer resetExercises={this.resetExercises} resetRoutines={this.resetRoutines} logout={this.handleLogOut}/>
    //     </BrowserRouter>
    //   </div>
    // );
  }
}

export default App;
