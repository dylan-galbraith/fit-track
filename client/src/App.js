import './App.scss'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Footer from './components/Footer'
import Home from './pages/home/Home'
import Exercises from './pages/exercises/Exercises'
import Routines from './pages/routines/Routines'

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/exercises' exact component={Exercises} />
          <Route path='/routines' exact component={Routines} />
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
