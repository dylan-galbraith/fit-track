import React, { Component } from 'react';
import axios from 'axios';
import errorIcon from '../../assets/icons/alert-circle.svg';
import { Redirect } from 'react-router-dom';

class AddExercise extends Component {

  state = {
    exercises: [],
    redirect: null
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

  handleSubmit = (e) => {
    e.preventDefault();
    const newExercise = {
      name: e.target.name.value
    }
    let approved = true
    this.state.exercises.forEach(item => {
      if (item.name.toUpperCase() === newExercise.name.toUpperCase()) {
        approved = false
        document.querySelector(".add-exercise__error").classList.add("add-exercise__error--show")
      }
    })
    if (approved) {
      axios
        .post('http://localhost:8070/exercises', newExercise)
        .then(response => {
          this.setState({
            redirect: `${response.data.id}`
          })
        })
    }
  }

  render() {
    if (this.state.redirect) return <Redirect to={this.state.redirect} />
    return (
      <main className="add-exercise">
        <h1 className="add-exercise__heading">Add a New Exercise</h1>
        <form onSubmit={this.handleSubmit} className="add-exercise__form">
          <input className="add-exercise__input" name="name" placeholder="Name of Exercise" />
          <span className="add-exercise__error"><img className="add-exercise__icon" src={errorIcon} alt="error icon" /> You already have an exercise with this name</span>
          <button className="add-exercise__button">Add</button>
        </form>
      </main>
    )
  }
}


export default AddExercise;