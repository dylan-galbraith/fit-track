import axios from 'axios';
import { Component } from 'react';

class SingleRoutine extends Component {

  state = {
    routine: null
  }

  componentDidMount = () => {
    axios
      .get(`http://localhost:8070/routines/${this.props.match.params.routineId}`)
      .then(response => {
        console.log(response);
        this.setState({
          routine: response.data
        })
      })
  }

  render() {
    if (!this.state.routine) return <p>Loading...</p>
    console.log(this.state);
    return (
      <main className="main">
        <h1 className="main__heading">{this.state.routine.name}</h1>
        {this.state.routine.exercise.map(item => {
          return (
            <div className="category__item" key={item.id}>
              <p to={`/routines/${item.id}`} className="category__name">{item.name}</p>
            </div> 
          )
        })}
      </main>
    )
  }
}

export default SingleRoutine