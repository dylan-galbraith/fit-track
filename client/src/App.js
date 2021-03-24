import './App.scss'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Component } from 'react'

import Footer from './components/Footer'
import Home from './pages/home/Home'
import Exercises from './pages/exercises/Exercises'
import Routines from './pages/routines/Routines'

class App extends Component {



  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/exercises' exact component={Exercises} />
            <Route path='/routines' exact component={Routines} />
          </Switch>
          <Footer/>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
