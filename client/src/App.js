import './App.scss'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Component } from 'react'
import axios from 'axios';

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

class App extends Component {

  state = {
    token: null,
    isLoggedIn: false,
    userId: null,
    username: null
  }

  handleLogin = (e) => {
    e.preventDefault();
    const user = {
      username: e.target.username.value,
      password: e.target.password.value
    }
  
    axios
      .post(`http://localhost:8070/login`, user)
      .then(response => {
        sessionStorage.setItem("authToken", response.data.token);

        this.setState({
          isLoggedIn: true,
          userId: response.data.user.id,
          username: response.data.user.name
        })
      })
  }

  render() {
    if (!this.state.isLoggedIn) {
      return (
        <div className="app">
          <Login login={this.handleLogin}/>
        </div>
      )
    }

    return (
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route path='/' exact ><Home username={this.state.username} /></Route>
            <Route path='/exercises' exact component={Exercises} />
            <Route path='/exercises/add' component={AddExercise} />
            <Route path='/exercises/:exerciseId' component={SingleExercise} />
            <Route path='/routines' exact component={Routines} />
            <Route path='/routines/add' component={AddRoutine} />
            <Route path='/routines/:routineId' component={SingleRoutine} />
            <Route path='/favourites' component={Favourites} />
          </Switch>
          <Footer/>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
