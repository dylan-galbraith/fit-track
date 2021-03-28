import axios from 'axios';
import { Component } from 'react';

class SingleRoutine extends Component {

  state = {
    routine: null
  }

  addRecord = (e) => {
    e.preventDefault();
    const newRecord = {
      weight: e.target.weight.value,
      reps: e.target.reps.value,
      exerciseId: e.target.id
    }
    console.log(newRecord);
    axios
      .post(`http://localhost:8070/records`, newRecord)
      .then(response => {
        console.log(response);
      })
  }

  componentDidMount = () => {
    axios
      .get(`http://localhost:8070/routines/${this.props.match.params.routineId}`)
      .then(response => {
        this.setState({
          routine: response.data
        })
      })
  }

  render() {
    if (!this.state.routine) return <p>Loading...</p>
    console.log(this.state.routine);
    return (
      <main className="main">
        <h1 className="main__heading">{this.state.routine.name}</h1>
        <div className="category">
          {this.state.routine.exercise.map(item => {
            return (
              <div className="routine__item" key={item.id}>
                <p className="routine__item__name">{item.name}</p>
                <div className="routine__item__info">
                  <div className="routine__item__section">
                    <p>Previous:</p>
                    <p>Weight: {item.record.length>0 ? item.record[0].weight : "N/A"}</p>
                    <p>Reps: {item.record.length>0 ? item.record[0].reps : "N/A"}</p>
                  </div>
                  <form id={item.id} onSubmit={this.addRecord} className="routine__item__section">
                    <label>Weight: <input className="routine__item__input" name="weight"/></label>
                    <label>Reps: <input className="routine__item__input" name="reps" /></label>
                    <button>Add</button>
                  </form>
                </div>
              </div> 
            )
          })}
        </div>
      </main>
    )
  }
}

export default SingleRoutine