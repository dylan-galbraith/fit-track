import axios from 'axios';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import filledStarIcon from '../../assets/icons/star.svg';

class Exercises extends Component {

  state = {
    exercises: []
  }

  componentDidMount = () => {
    axios
      .get('http://localhost:8070/exercises')
      .then(response => {
        this.setState({
          exercises: response.data
        })
      })
  }

  render() {
    return (
      <main className="exercises">
        <h1 className="exercises__heading">Exercises</h1>
        <div className="exercises__list">
          {this.state.exercises.map(item => {
            return (
                <Link to={`/exercises/${item.id}`} className={this.state.exercises.indexOf(item)===0 ? "exercises__name exercises__name--top" : "exercises__name"}>{item.name} <img src={item.favourite ? filledStarIcon : ""} className="exercises__icon" /></Link>
            )
          })}
        </div>
      </main>
    )
  }
}

export default Exercises