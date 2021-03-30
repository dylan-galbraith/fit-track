import { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.scss';
import { API_URL } from '../../utils';

class Home extends Component {

  state = {
    routines: [],
    favourites: []
  }

  componentDidMount = () => {
    axios
      .get(`${API_URL}/routines`)
      .then( response => {
        this.setState({
          routines: response.data
        })
      })
      .then(
        axios
          .get(`${API_URL}/exercises`)
          .then( response => {
            const favourites = response.data.filter(item => item.favourite)
            this.setState({
              favourites: favourites
            })
          })
      )
  }

  render() {
    return(
      <main className="home">
        <h1 className="home__heading">Welcome back, Dylan!</h1>
        <h3 className="home__category__heading">Routines</h3>
        <article className="home__category">
          {this.state.routines.map(item => {
            return (
                <Link key={item.id} to={`/routines/${item.id}`} className={this.state.routines.indexOf(item)===0 ? "home__name home__name--top" : "home__name"}>{item.name}</Link>
            )
          })}
        </article>
        <h3 className="home__category__heading">Favourites</h3>
        <article className="home__category">
          {this.state.favourites.map(item => {
            return (
                <Link key={item.id} to={`/exercises/${item.id}`} className={this.state.favourites.indexOf(item)===0 ? "home__name home__name--top" : "home__name"}>{item.name}</Link>
            )
          })}
        </article>
      </main>
    )
  }
}

export default Home;