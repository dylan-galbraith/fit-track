import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import filledStarIcon from '../../assets/icons/star.svg';
import './Favourites.scss';
import { API_URL } from '../../utils';

class Favourites extends Component {

  state = {
    favourites: []
  }

  componentDidMount = () => {
    axios
    .get(`${API_URL}/exercises`)
    .then( response => {
      const favourites = response.data.filter(item => item.favourite)
      this.setState({
        favourites: favourites
      })
    })  
  }

  render() {
    return (
      <div className="favourites">
        <h1 className="favourites__heading">Favourites</h1>
        <div className="favourites__list">
          {this.state.favourites.map(item => {
            return (
                <Link key={item.id} to={`/exercises/${item.id}`} className={this.state.favourites.indexOf(item)===0 ? "favourites__name favourites__name--top" : "favourites__name"}>{item.name} <img className="favourites__icon" src={filledStarIcon} alt="favourite icon" /></Link>
            )
          })}      
        </div>
      </div>
    )
  }
}

export default Favourites;