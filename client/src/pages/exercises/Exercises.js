import axios from 'axios';
import { Component } from 'react';
import { Link } from 'react-router-dom';

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
      <main className="main">
        <h1 className="main__heading">Exercises</h1>
        {this.state.exercises.map(item => {
            return (
              <div className="category__item" key={item.id}>
                <Link to={`/exercises/${item.id}`} className="category__name">{item.name}</Link>
              </div>
            )
          })}
      </main>
    )
  }
}

export default Exercises