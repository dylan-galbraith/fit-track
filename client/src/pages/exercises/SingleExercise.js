import axios from 'axios';
import { Component } from 'react';

class SingleExercise extends Component {

  state = {
    exercise: []
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
    console.log(this.state);
    return (
      <main className="main">
        <h1 className="main__heading">{this.state.exercise.name}</h1>

      </main>
    )
  }
}

export default SingleExercise