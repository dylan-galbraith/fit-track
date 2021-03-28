import axios from 'axios';
import { Component } from 'react';
import starIcon from '../../assets/icons/star-outline.svg';
import filledStarIcon from '../../assets/icons/star.svg';
import backIcon from '../../assets/icons/arrow-back.svg';
import { Link } from 'react-router-dom';

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
      <main className="exercise">
        <h1 className="exercise__heading"><Link to="/exercises"><img src={backIcon} className="exercise__icon" /></Link>{this.state.exercise.name} <img onClick={this.favouriteHandler} className="exercise__icon" src={this.state.exercise.favourite ? filledStarIcon : starIcon} /> </h1>
        {this.state.exercise.record.map(item => {
          return (
            <div className="exercise__record" key={item.id}>
              <p className="exercise__stat"><span className="exercise__label">DATE: </span>{item.date}</p>
              <p className="exercise__stat"><span className="exercise__label">WEIGHT: </span>{item.weight}</p>
              <p className="exercise__stat"><span className="exercise__label">REPS: </span>{item.reps}</p>
            </div>
          )
        })}
      </main>
    )
  }
}

export default SingleExercise