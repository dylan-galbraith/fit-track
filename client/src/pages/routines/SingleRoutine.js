import axios from 'axios';
import React, { useState, useEffect } from 'react';
import backIcon from '../../assets/icons/arrow-back.svg';
import { Link, Redirect, useParams } from 'react-router-dom';
import exitIcon from '../../assets/icons/exit-icon.svg';
import { API_URL } from '../../utils';

export default function SingleRoutine({ getData }) {

  const [info, setInfo] = useState()
  const [redirect, setRedirect] = useState()
  const [adding, setAdding] = useState(false)
  const [allExercises, setAllExercises] = useState()

  const { routineId } = useParams();

  useEffect(() => {
    async function fetchData() {
      const data = await getData()
      setAllExercises(data.exercises)
      setInfo(data.routines.find(item => item.id == routineId))
    }
    fetchData();
  }, []) 

  function addRecord(e) {
    e.preventDefault();
    const newRecord = {
      weight: e.target.weight.value,
      reps: e.target.reps.value,
      exerciseId: e.target.id
    }
    document.getElementById(e.target.id).classList.add("disabled");
    axios
      .post(`${API_URL}/records/${this.state.routine.user.id}`, newRecord)
      .then(response => {
      })
  }

  function addExercises() {
    axios
      .get(`${API_URL}/exercises/all/${this.state.routine.user.id}`)
      .then(response => {
        this.setState({
          allExercises: response.data,
          adding: true
        })
      })
  }

  function selectedExercise (id) {
    axios
      .put(`${API_URL}/exercises/${id}/add/${this.props.match.params.routineId}/${this.state.routine.user.id}`)
      .then (response => {
        this.setState({
          allExercises: this.state.allExercises.filter(item => item.id !== id)
        })
      })
  }

  function exitAdding() {
    axios
      .get(`${API_URL}/routines/${this.props.match.params.routineId}`)
      .then(response => {
        this.setState({
          routine: response.data,
          adding: false
        })
      })
  }

  function deleteExercise(id) {
    axios
      .put(`${API_URL}/routines/${this.props.match.params.routineId}/remove/${id}/${this.state.routine.user.id}`)
      .then(response => {
        axios
          .get(`${API_URL}/routines/${this.props.match.params.routineId}`)
          .then(response => {
            this.setState({
              routine: response.data
            })
          })
      })
  }

  function deleteRoutine() {
    axios
      .delete(`${API_URL}/routines/${this.props.match.params.routineId}/${this.state.routine.user.id}`)
      .then(response => {
        this.setState({
          redirect: '/routines'
        })
      })
  }
  console.log(info);
  if (!info) return <p>Loading...</p>
  if (redirect) return <Redirect to={redirect} />
  if (adding) {
    return (
      <main className="routine">
        <h1 className="routine__heading"><Link to="/routines"><img className="routine__icon" src={backIcon} alt="back icon" /></Link>{info.name}</h1>    
        <div className="routine__item">
          <button  onClick={exitAdding} className="routine__add">Done</button>
        </div>
        <div className="exercises__list">
        <Link to='/exercises/add' className="exercises__add">Create A New Exercise!</Link>
          {allExercises.map(item => {
            if (!info.find(each => each.id === item.id)){
              return <button key={item.id} onClick={() => selectedExercise(item.id)} className="routines__name adding">{item.name} </button>
            }
            return null
          })}
        </div>
      </main>
    )
  }
  return (
    <main className="routine">
      <h1 className="routine__heading"><Link to="/routines"><img className="routine__icon" src={backIcon} alt="back icon" /></Link>{info.name}</h1>
      <div className="routine__item">
        <button  onClick={addExercises} className="routine__add">Add an Exercise!</button>
      </div>
      {info.exercise.map(item => {
        return (
          <div className="routine__item" id={item.id} key={item.id}>
            <img onClick={() => deleteExercise(item.id)} src={exitIcon} className="routine__item__icon" alt="exit icon" />
            <p className="routine__item__name">{item.name}</p>
            <form id={item.id} onSubmit={addRecord} className="routine__item__form">
              <div className="routine__item__row">
                <p className="routine__item__stat">Previous:</p>
                <p className="routine__item__stat">New:</p>
              </div>
              <div className="routine__item__row">
                <p className="routine__item__stat">Weight: {item.record.length>0 ? item.record[0].weight : "N/A"}</p>
                <label className="routine__item__stat"><input className="routine__item__input" name="weight" placeholder="Weight" />lbs</label>
              </div>
              <div className="routine__item__row">
                <p className="routine__item__stat">Reps: {item.record.length>0 ? item.record[0].reps : "N/A"}</p>
                <label className="routine__item__stat"><input className="routine__item__input" name="reps" placeholder="Reps" />reps</label>
              </div>
              <button className="routine__item__button">Add</button>
            </form>
          </div>
        )
      })}
      <div className="routine__item">
        <button  onClick={deleteRoutine} className="routine__delete">Delete Routine</button>
      </div>
    </main>
  )
}