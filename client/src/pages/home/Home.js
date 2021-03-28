import { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Home extends Component {

  state = {
    routines: [],
    favourites: []
  }

  componentDidMount = () => {
    axios
      .get('http://localhost:8070/routines')
      .then( response => {
        this.setState({
          routines: response.data
        })
      })
      .then(
        axios
          .get('http://localhost:8070/exercises')
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
        <article className="home__category">
        <h3 className="home__category__heading">Routines</h3>
          {this.state.routines.map(item => {
            return (
                <Link to={`/routines/${item.id}`} className={this.state.routines.indexOf(item)===0 ? "home__name home__name--top" : "home__name"}>{item.name}</Link>
            )
          })}
        </article>
        <article className="home__category">
          <h3 className="home__category__heading">Favourites</h3>
          {this.state.favourites.map(item => {
            return (
                <Link to={`/exercises/${item.id}`} className={this.state.favourites.indexOf(item)===0 ? "home__name home__name--top" : "home__name"}>{item.name}</Link>
            )
          })}
        </article>
      </main>
    )
  }
}

export default Home;