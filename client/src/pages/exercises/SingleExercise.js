import axios from 'axios';
import starIcon from '../../assets/icons/star-outline.svg';
import filledStarIcon from '../../assets/icons/star.svg';
import backIcon from '../../assets/icons/arrow-back.svg';
import exitIcon from '../../assets/icons/exit-icon.svg';
import { Link, Redirect, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function SingleRoutine({ getData }) {

  const [info, setInfo] = useState()
  const [redirect, setRedirect] = useState()
  const { currentUser } = useAuth()
  const API_URL = process.env.API_URL

  const { exerciseId } = useParams();

  async function fetchData() {
    const data = await getData(currentUser.uid)
    setInfo(data.exercises.find(item => item.id === parseInt(exerciseId)))
  }

  useEffect(() => {
    async function fetchData() {
      const data = await getData(currentUser.uid)
      setInfo(data.exercises.find(item => item.id === parseInt(exerciseId)))
    }
    fetchData()
  }, [getData, exerciseId, currentUser.uid]) 

  function favouriteExercise() {
    const favStatus = {favourite: !info.favourite}
    axios
      .put(`${API_URL}/exercises/${exerciseId}/favourite`, favStatus)
      .then(() => {
        fetchData();
      })
  }

  function addRecord(e) {
    e.preventDefault();
    const newRecord = {
      weight: e.target.weight.value,
      reps: e.target.reps.value,
      exerciseId: exerciseId,
      note: e.target.note.value
    }
    axios
      .post(`${API_URL}/records`, newRecord)
      .then(() => {
        e.target.weight.value = "";
        e.target.reps.value = "";
        e.target.note.value = "";
        fetchData();
      })
  }

  function deleteExercise() {
    axios
      .delete(`${API_URL}/exercises/${exerciseId}`)
      .then(() => {
        setRedirect('/exercises')
      })
  }

  function deleteRecord(id) {
    axios
      .delete(`${API_URL}/records/${id}`)
      .then(() => {
        fetchData();
      })
  }
  if (!info) return <p>Loading...</p>
  if (redirect) return <Redirect to={redirect} />
  return (
    <main className="exercise">
      <h1 className="exercise__heading">
        <Link to="/exercises"><img src={backIcon} className="exercise__icon" alt="back icon" /></Link>
        {info.name}
        <img onClick={favouriteExercise} className="exercise__icon" src={info.favourite ? filledStarIcon : starIcon} alt="favourite icon" /> 
      </h1>
      <form onSubmit={addRecord} className="exercise__record">
        <div className="exercise__form__row">
          <input className="exercise__form__input" name="weight" placeholder="Weight (in lbs)" />
          <input className="exercise__form__input" name="reps" placeholder="Reps" />
        </div>
        <textarea className="exercise__form__input exercise__form__input--note" name="note" placeholder="Notes" />
        <button className="exercise__form__button">Add</button>
      </form>
      {info.record.map(item => {
        return (
          <div className="exercise__record" key={item.id}>
            <img onClick={() => deleteRecord(item.id)} src={exitIcon} className="exercise__delete-icon" alt="delete icon" />
            <p className="exercise__stat"><span className="exercise__label">DATE: </span>{new Date(item.date).toDateString()}</p>
            <p className="exercise__stat"><span className="exercise__label">WEIGHT: </span>{item.weight}</p>
            <p className="exercise__stat"><span className="exercise__label">REPS: </span>{item.reps}</p>
            <p className={item.note ? "exercise__stat" : "exercise__stat--hide"}><span className="exercise__label">NOTE: </span>{item.note}</p>
          </div>
        )
      })}
      <div className="exercise__record">
        <button  onClick={deleteExercise} className="exercise__delete">Delete Exercise</button>
      </div>
    </main>
  )
}
