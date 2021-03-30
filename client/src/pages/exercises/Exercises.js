import axios from 'axios';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import filledStarIcon from '../../assets/icons/star.svg';
import addIcon from '../../assets/icons/add.svg';
import './Exercises.scss';
import { API_URL } from '../../utils';

class Exercises extends Component {

  state = {
    exercises: [],
    search: ""
  }

  handleChange = (e) => {
    this.setState({
      search: e.target.value.toUpperCase()
    })
  }

  componentDidMount = () => {
    axios
      .get(`${API_URL}/exercises`)
      .then(response => {
        this.setState({
          exercises: response.data
        })
      })
  }

  render() {
    return (
      <main className="exercises">
        <h1 className="exercises__heading">Exercises <Link to="/exercises/add"><img onClick={this.optionMenu} className="exercises__icon" src={addIcon} alt="add icon" /></Link></h1>
        <div className="exercises__list">
          <input onChange={this.handleChange} className="exercises__search" placeholder="Search" />
          {this.state.exercises.map(item => {
            if (item.name.toUpperCase().includes(this.state.search)){
              return <Link key={item.id} to={`/exercises/${item.id}`} className={this.state.exercises.indexOf(item)===0 ? "exercises__name exercises__name--top" : "exercises__name"}>{item.name} <img src={item.favourite ? filledStarIcon : null} className="exercises__icon" alt="favourite icon" /></Link>
            }
            return null
          })}
        </div>
      </main>
    )
  }
}

export default Exercises