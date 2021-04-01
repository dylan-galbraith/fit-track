import './App.scss'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Component } from 'react'
import axios from 'axios';
import { API_URL } from './utils';

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

class App extends Component {

  state = {
    token: null,
    isLoggedIn: false,
    signUp: false,
    errorMessage: null,
    user: null,
    exercises: null,
    routines: null
  }

  startSignUp = (e) => {
    this.setState({
      signUp: true
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
        console.log(response.data);
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
        console.log(response);
        if(response.status === 200) {
          this.setState({
            isLoggedIn: true,
            username: response.data.user.firstName
          })
        }
      })
  }

  render() {
    if (!this.state.isLoggedIn) {
      return (
        <div className="app">
          {this.state.signUp ? <SignUp signup={this.handleSignUp}  /> : <Login login={this.handleLogin} signUp={this.startSignUp}/>}
        </div>
      )
    }

    return (
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route path='/' exact > <Home user={this.state.user} routines={this.state.routines} exercises={this.state.exercises}/> </Route>
            <Route path='/exercises' exact > <Exercises exercises={this.state.exercises} /> </Route>
            <Route path='/exercises/add' component={AddExercise} />
            <Route path='/exercises/:exerciseId' component={SingleExercise} />
            <Route path='/routines' > <Routines routines={this.state.routines} /> </Route>
            <Route path='/routines/add' component={AddRoutine} />
            <Route path='/routines/:routineId' component={SingleRoutine} />
            <Route path='/favourites' > <Favourites exercises={this.state.exercises} /> </Route>
          </Switch>
          <Footer/>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
