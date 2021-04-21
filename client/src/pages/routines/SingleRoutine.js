import axios from 'axios';
import React, { useState, useEffect } from 'react';
import backIcon from '../../assets/icons/arrow-back.svg';
import { Link, Redirect, useParams } from 'react-router-dom';
import exitIcon from '../../assets/icons/exit-icon.svg';
import { useAuth } from '../../contexts/AuthContext';
import Loading from '../../components/Loading';

export default function SingleRoutine({ getData }) {

  const [info, setInfo] = useState()
  const [redirect, setRedirect] = useState()
  const [adding, setAdding] = useState(false)
  const [allExercises, setAllExercises] = useState()

  const { routineId } = useParams();
  const { currentUser } = useAuth()

  async function fetchData() {
    const data = await getData(currentUser.uid)
    setAllExercises(data.exercises)
    setInfo(data.routines.find(item => item.id === parseInt(routineId)))
  }

  useEffect(() => {
    async function fetchData() {
      const data = await getData(currentUser.uid)
      setAllExercises(data.exercises)
      setInfo(data.routines.find(item => item.id === parseInt(routineId)))
    }
    fetchData();
  }, [getData, routineId, currentUser.uid]) 

  function addRecord(e) {
    e.preventDefault();
    const newRecord = {
      weight: e.target.weight.value,
      reps: e.target.reps.value,
      exerciseId: e.target.id,
      note: e.target.note.value
    }
    document.getElementById(e.target.id).classList.add("disabled");
    axios
      .post(`${process.env.REACT_APP_API_URL}/records`, newRecord)
  }

  function addMenu() {
    setAdding(!adding)
  }

  function selectedExercise (id) {
    axios
      .put(`${process.env.REACT_APP_API_URL}/exercises/${id}/add/${routineId}`)
      .then (() => {
        fetchData();
      })
  }

  function deleteExercise(id) {
    axios
      .put(`${process.env.REACT_APP_API_URL}/routines/${routineId}/remove/${id}`)
      .then(response => {
        fetchData();
      })
  }

  function deleteRoutine() {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/routines/${routineId}`)
      .then(response => {
        setRedirect('/routines')
      })
  }

  if (!info) return <Loading/>
  if (redirect) return <Redirect to={redirect} />
  if (adding) {
    return (
      <main className="routine">
        <h1 className="routine__heading"><Link to="/routines"><img className="routine__icon" src={backIcon} alt="back icon" /></Link>{info.name}</h1>    
        <div className="routine__item">
          <button  onClick={addMenu} className="routine__add">Done</button>
        </div>
        <div className="exercises__list">
        <Link to='/exercises/add' className="exercises__add">Create A New Exercise!</Link>
          {allExercises.map(item => {
            if (!info.exercise.find(each => each.id === item.id)){
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
        <button  onClick={addMenu} className="routine__add">Add an Exercise!</button>
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
              <div className="routine__item__row routine__item__row--notes">
                <p className="routine__item__stat">Notes:<br/> {item.record.length>0 && item.record[0].note ? item.record[0].note : "N/A"}</p>
                <label className="routine__item__stat"><textarea className="routine__item__input routine__item__input--notes" name="note" placeholder="Notes" /></label>
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