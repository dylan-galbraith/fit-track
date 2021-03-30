import axios from 'axios';
import { Component } from 'react';
import starIcon from '../../assets/icons/star-outline.svg';
import filledStarIcon from '../../assets/icons/star.svg';
import backIcon from '../../assets/icons/arrow-back.svg';
import deleteIcon from '../../assets/icons/trash-outline.svg';
import { Link, Redirect } from 'react-router-dom';

class SingleExercise extends Component {

  state = {
    exercise: null,
    redirect: null
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

  addRecord = (e) => {
    e.preventDefault();
    const newRecord = {
      weight: e.target.weight.value,
      reps: e.target.reps.value,
      exerciseId: this.props.match.params.exerciseId
    }
    axios
      .post(`http://localhost:8070/records`, newRecord)
      .then(response => {
        e.target.weight.value = "";
        e.target.reps.value = "";
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
        this.setState({
          redirect: '/exercises'
        })
      })
  }

  deleteRecord = (id) => {
    axios
      .delete(`http://localhost:8070/records/${id}`)
      .then(response => {
        console.log(response);
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
    if (this.state.redirect) return <Redirect to={this.state.redirect} />
    return (
      <main className="exercise">
        <h1 className="exercise__heading"><Link to="/exercises"><img src={backIcon} className="exercise__icon" /></Link>{this.state.exercise.name}<img src={deleteIcon} className="exercise__icon" onClick={this.deleteHandler} /><img onClick={this.favouriteHandler} className="exercise__icon" src={this.state.exercise.favourite ? filledStarIcon : starIcon} /> </h1>
        <form onSubmit={this.addRecord} className="exercise__record">
          <div className="exercise__form__row">
            <input className="exercise__form__input" name="weight" placeholder="Weight (in lbs)" />
            <input className="exercise__form__input" name="reps" placeholder="Reps" />
          </div>
          <button className="exercise__form__button">Add</button>
        </form>
        {this.state.exercise.record.map(item => {
        console.log(item);
          return (
            <div className="exercise__record" key={item.id}>
              <img onClick={() => this.deleteRecord(item.id)} src={deleteIcon} className="exercise__icon exercise__delete-record" />
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