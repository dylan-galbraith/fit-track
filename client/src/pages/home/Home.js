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
      <main className="main">
        <h1 className="main__heading">Welcome, Dylan!</h1>
        <article className="category">
        <h3 className="category__heading">Routines</h3>
          {this.state.routines.map(item => {
            return (
              <div className="category__item" key={item.id}>
                <Link to={`/routines/${item.id}`} className="category__name">{item.name}</Link>
              </div>
            )
          })}
        </article>
        <article className="category">
          <h3 className="category__heading">Favourites</h3>
          {this.state.favourites.map(item => {
            return (
              <div className="category__item" key={item.id}>
                <Link to={`/exercises/${item.id}`} className="category__name">{item.name}</Link>
              </div>
            )
          })}
        </article>
      </main>
    )
  }
}

export default Home;