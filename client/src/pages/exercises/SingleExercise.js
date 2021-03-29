import axios from 'axios';
import { Component } from 'react';
import starIcon from '../../assets/icons/star-outline.svg';
import filledStarIcon from '../../assets/icons/star.svg';
import backIcon from '../../assets/icons/arrow-back.svg';
import deleteIcon from '../../assets/icons/trash-outline.svg';
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

  deleteHandler = () => {
    axios
      .delete(`http://localhost:8070/exercises/${this.props.match.params.exerciseId}`)
      .then(response => {
        console.log(response);
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
    return (
      <main className="exercise">
        <h1 className="exercise__heading"><Link to="/exercises"><img src={backIcon} className="exercise__icon" /></Link>{this.state.exercise.name}<Link to="/exercises"><img src={deleteIcon} className="exercise__icon" onClick={this.deleteHandler} /></Link> <img onClick={this.favouriteHandler} className="exercise__icon" src={this.state.exercise.favourite ? filledStarIcon : starIcon} /> </h1>
        {this.state.exercise.record.map(item => {
          return (
            <div className="exercise__record" key={item.id}>
              <p className="exercise__stat"><span className="exercise__label">DATE: </span>{new Date(item.date).toDateString()}</p>
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