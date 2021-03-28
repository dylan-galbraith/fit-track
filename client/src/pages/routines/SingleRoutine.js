import axios from 'axios';
import { Component } from 'react';
import backIcon from '../../assets/icons/arrow-back.svg';
import { Link } from 'react-router-dom';

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
      <main className="routine">
        <h1 className="routine__heading"><Link to="/routines"><img className="routine__icon" src={backIcon} /></Link>{this.state.routine.name}</h1>
        {this.state.routine.exercise.map(item => {
          return (
            <div className="routine__item" key={item.id}>
              <p className="routine__item__name">{item.name}</p>
              <form id={item.id} onSubmit={this.addRecord} className="routine__item__form">
                <div className="routine__item__row">
                  <p className="routine__item__stat">Previous:</p>
                  <p className="routine__item__stat">New:</p>
                </div>
                <div className="routine__item__row">
                  <p className="routine__item__stat">Weight: {item.record.length>0 ? item.record[0].weight : "N/A"}</p>
                  <input className="routine__item__input" name="weight" placeholder="Weight (in lbs)" />
                </div>
                <div className="routine__item__row">
                  <p className="routine__item__stat">Reps: {item.record.length>0 ? item.record[0].reps : "N/A"}</p>
                  <input className="routine__item__input" name="reps" placeholder="Reps" />
                </div>
                <button className="routine__item__button">Add</button>
              </form>
            </div>
          )
        })}
      </main>
    )
  }
}

export default SingleRoutine