import axios from 'axios';
import { Component } from 'react';
import starIcon from '../../assets/icons/star-outline.svg';
import filledStarIcon from '../../assets/icons/star.svg';
import backIcon from '../../assets/icons/arrow-back.svg';
import exitIcon from '../../assets/icons/exit-icon.svg';
import { Link, Redirect } from 'react-router-dom';
import { API_URL } from '../../utils';

class SingleExercise extends Component {

  state = {
    exercise: null,
    redirect: null
  }

  favouriteExercise = () => {
    const favourite = {favourite: !this.state.exercise.favourite}
    axios
      .put(`${API_URL}/exercises/${this.props.match.params.exerciseId}/favourite/${this.state.exercise.user.id}`, favourite)
      .then(response => {
        axios
        .get(`${API_URL}/exercises/${this.props.match.params.exerciseId}`)
        .then(response => {
          this.setState({
            exercise: response.data
          })
        })
      })
  }

  addRecord = (e) => {
    e.preventDefault();
    const newRecord = {
      weight: e.target.weight.value,
      reps: e.target.reps.value,
      exerciseId: this.state.exercise.id,
      note: e.target.note.value
    }
    axios
      .post(`${API_URL}/records/${this.state.exercise.user.id}`, newRecord)
      .then(response => {
        e.target.weight.value = "";
        e.target.reps.value = "";
        e.target.note.value = "";
        axios
        .get(`${API_URL}/exercises/${this.props.match.params.exerciseId}`)
        .then(response => {
          this.setState({
            exercise: response.data
          })
        })
      })
  }

  deleteExercise = () => {
    axios
      .delete(`${API_URL}/exercises/${this.state.exercise.id}/${this.state.exercise.user.id}`)
      .then(response => {
        this.setState({
          redirect: '/exercises'
        })
      })
  }

  deleteRecord = (id) => {
    axios
      .delete(`${API_URL}/records/${id}/${this.state.exercise.user.id}`)
      .then(response => {
        axios
          .get(`${API_URL}/exercises/${this.state.exercise.id}`)
          .then(response => {
            this.setState({
              exercise: response.data
            })
          })
      })
  }

  componentDidMount = () => {
    axios
      .get(`${API_URL}/exercises/${this.props.match.params.exerciseId}`)
      .then(response => {
        this.setState({
          exercise: response.data
        })
      })
  }

  render() {
    if (!this.state.exercise) return <p>Loading...</p>
    if (this.state.redirect) return <Redirect to={this.state.redirect} />
    return (
      <main className="exercise">
        <h1 className="exercise__heading">
          <Link to="/exercises"><img src={backIcon} className="exercise__icon" alt="back icon" /></Link>
          {this.state.exercise.name}
          <img onClick={this.favouriteExercise} className="exercise__icon" src={this.state.exercise.favourite ? filledStarIcon : starIcon} alt="favourite icon" /> 
        </h1>
        <form onSubmit={this.addRecord} className="exercise__record">
          <div className="exercise__form__row">
            <input className="exercise__form__input" name="weight" placeholder="Weight (in lbs)" />
            <input className="exercise__form__input" name="reps" placeholder="Reps" />
          </div>
          <textarea className="exercise__form__input exercise__form__input--note" name="note" placeholder="Notes" />
          <button className="exercise__form__button">Add</button>
        </form>
        {this.state.exercise.record.map(item => {
          return (
            <div className="exercise__record" key={item.id}>
              <img onClick={() => this.deleteRecord(item.id)} src={exitIcon} className="exercise__delete-icon" alt="delete icon" />
              <p className="exercise__stat"><span className="exercise__label">DATE: </span>{new Date(item.date).toDateString()}</p>
              <p className="exercise__stat"><span className="exercise__label">WEIGHT: </span>{item.weight}</p>
              <p className="exercise__stat"><span className="exercise__label">REPS: </span>{item.reps}</p>
              <p className="exercise__stat"><span className="exercise__label">NOTE: </span>{item.note}</p>
            </div>
          )
        })}
        <div className="exercise__record">
          <button  onClick={this.deleteExercise} className="exercise__delete">Delete Exercise</button>
        </div>
      </main>
    )
  }
}

export default SingleExercise