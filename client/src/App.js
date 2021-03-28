import './App.scss'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Component } from 'react'

import Footer from './components/Footer'
import Home from './pages/home/Home'
import Exercises from './pages/exercises/Exercises'
import SingleExercise from './pages/exercises/SingleExercise'
import Routines from './pages/routines/Routines'
import SingleRoutine from './pages/routines/SingleRoutine';
import Favourites from './pages/favourites/Favourites';

class App extends Component {



  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/exercises' exact component={Exercises} />
            <Route path='/exercises/:exerciseId' component={SingleExercise} />
            <Route path='/routines' exact component={Routines} />
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
