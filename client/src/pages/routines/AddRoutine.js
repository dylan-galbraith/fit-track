import React, { Component } from 'react';
import axios from 'axios';
import errorIcon from '../../assets/icons/alert-circle.svg';
import { Redirect } from 'react-router-dom';

class AddRoutine extends Component {

  state = {
    routines: [],
    redirect: null
  }

  componentDidMount = () => {
    axios
      .get('http://localhost:8070/routines')
      .then(response => {
        this.setState({
          routines: response.data
        })
      })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const newRoutine = {
      name: e.target.name.value
    }
    let approved = true
    this.state.routines.forEach(item => {
      if (item.name.toUpperCase() === newRoutine.name.toUpperCase()) {
        approved = false
        document.querySelector(".add-routine__error").classList.add("add-routine__error--show")
      }
    })
    if (approved) {
      axios
        .post('http://localhost:8070/routines', newRoutine)
        .then(response => {
          this.setState({
            redirect: `/routines/${response.data.id}`
          })
        })
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <main className="add-routine">
        <h1 className="add-routine__heading">Add a New Routine</h1>
        <form onSubmit={this.handleSubmit} className="add-routine__form">
          <input className="add-routine__input" name="name" placeholder="Name of routine" />
          <span className="add-routine__error"><img className="add-routine__icon" src={errorIcon} /> You already have a routine with this name</span>
          <button className="add-routine__button">Add</button>
        </form>
      </main>
    )
  }
}


export default AddRoutine;