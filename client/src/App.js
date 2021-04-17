import './App.scss'
import { BrowserRouter, Route, Switch } from "react-router-dom";
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
import UpdateName from './components/UpdateName';

function App() {

  async function getData(id) {
    try {
      const exercises = await axios.get(`${API_URL}/exercises/all/${id}`)
      const routines = await axios.get(`${API_URL}/routines/all/${id}`)
      return {exercises: exercises.data, routines: routines.data}
    } catch {
      console.log("error");
    }
  }

  return (
    <div className="app">
      <BrowserRouter>
        <AuthProvider>
          <Switch>
            <PrivateRoute path='/' exact component={()=> <Home getData={getData} />} />
            <PrivateRoute path='/favourites' exact component={()=> <Favourites getData={getData} />} />
            <PrivateRoute path='/routines' exact component={()=> <Routines getData={getData} />} />
            <PrivateRoute path='/routines/add' component={()=> <AddRoutine getData={getData} />} />
            <PrivateRoute path='/routines/:routineId' component={()=> <SingleRoutine getData={getData} />} />
            <PrivateRoute path='/exercises' exact component={()=> <Exercises getData={getData} />} />
            <PrivateRoute path='/exercises/add' component={()=> <AddExercise getData={getData} />} />
            <PrivateRoute path='/exercises/:exerciseId' component={()=> <SingleExercise getData={getData} />} />
            <Route path='/signup' component={SignUp} />
            <Route path='/login' component={Login} />
            <PrivateRoute path='/update' component={UpdateName} />
          </Switch>
          <Footer/>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App;
