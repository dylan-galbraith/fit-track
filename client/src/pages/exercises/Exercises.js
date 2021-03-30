import axios from 'axios';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import filledStarIcon from '../../assets/icons/star.svg';
import addIcon from '../../assets/icons/add.svg';

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
        <h1 className="exercises__heading">Exercises <Link to="/exercises/add"><img onClick={this.optionMenu} className="exercises__icon" src={addIcon} /></Link></h1>
        <div className="exercises__list">
          <input onChange={this.handleChange} className="exercises__search" placeholder="Search" />
          {this.state.exercises.map(item => {
            if (item.name.toUpperCase().includes(this.state.search)){
              return <Link to={`/exercises/${item.id}`} className={this.state.exercises.indexOf(item)===0 ? "exercises__name exercises__name--top" : "exercises__name"}>{item.name} <img src={item.favourite ? filledStarIcon : ""} className="exercises__icon" /></Link>
            }
          })}
        </div>
      </main>
    )
  }
}

export default Exercises