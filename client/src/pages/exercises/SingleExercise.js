import axios from 'axios';
import { Component } from 'react';
import starIcon from '../../assets/icons/star-outline.svg';
import filledStarIcon from '../../assets/icons/star.svg';

class SingleExercise extends Component {

  state = {
    exercise: null
  }

  favouriteHandler = () => {
    const favourite = {favourite: !this.state.exercise.favourite}
    axios
      .put(`http://localhost:8070/exercises/${this.props.match.params.exerciseId}/favourite`, favourite)
      .then(response => {
        axios
        .get(`http://localhost:8070/exercises/${this.props.match.params.exerciseId}`)
        .then(response => {
          this.setState({
            exercise: response.data
          })
        })
      })
  }

  componentDidMount = () => {
    axios
      .get(`http://localhost:8070/exercises/${this.props.match.params.exerciseId}`)
      .then(response => {
        this.setState({
          exercise: response.data
        })
      })
  }

  render() {
    if (!this.state.exercise) return <p>Loading...</p>
    console.log(this.state);
    return (
      <main className="main">
        <h1 className="main__heading">{this.state.exercise.name} <img onClick={this.favouriteHandler} className="exercise__icon" src={this.state.exercise.favourite ? filledStarIcon : starIcon} /> </h1>
        {this.state.exercise.record.map(item => {
          return (
            <div className="category__item" key={item.id}>
              <p className="category__name">Date: {item.date}</p>
              <p className="category__name">Weight: {item.weight}</p>
              <p className="category__name">Reps: {item.reps}</p>
            </div>
          )
        })}
      </main>
    )
  }
}

export default SingleExercise