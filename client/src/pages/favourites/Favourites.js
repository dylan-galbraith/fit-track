import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Favourites extends Component {

  state = {
    favourites: []
  }

  componentDidMount = () => {
    axios
    .get('http://localhost:8070/exercises')
    .then( response => {
      const favourites = response.data.filter(item => item.favourite)
      this.setState({
        favourites: favourites
      })
    })  
  }

  render() {
    return (
      <div>
        <h1>Favourites</h1>
        {this.state.favourites.map(item => {
            return (
              <div className="category__item" key={item.id}>
                <Link to={`/exercises/${item.id}`} className="category__name">{item.name}</Link>
              </div>
            )
          })}      
      </div>
    )
  }
}

export default Favourites;