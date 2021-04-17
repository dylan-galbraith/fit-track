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

  getData = async () => {
    try {
      const exercises = await axios.get(`${API_URL}/exercises/all/20`)
      const routines = await axios.get(`${API_URL}/routines/all/20`)
      return {exercises: exercises.data, routines: routines.data}
    } catch {
      console.log("error");
    }
  }


  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <AuthProvider>
            <Switch>
              <PrivateRoute path='/' exact component={()=> <Home getData={this.getData} />} />
              <PrivateRoute path='/routines' exact component={()=> <Routines getData={this.getData} />} />
              <PrivateRoute path='/routines/add' component={()=> <AddRoutine getData={this.getData} />} />
              <PrivateRoute path='/routines/:routineId' component={()=> <SingleRoutine getData={this.getData} />} />
              <Route path='/signup' component={SignUp} />
              <Route path='/login' component={Login} />
            </Switch>
            <Footer resetExercises={this.resetExercises} resetRoutines={this.resetRoutines} logout={this.handleLogOut}/>
          </AuthProvider>
        </BrowserRouter>
      </div>
    )

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
