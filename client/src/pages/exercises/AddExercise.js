import React, { useEffect, useState } from 'react';
import axios from 'axios';
import errorIcon from '../../assets/icons/alert-circle.svg';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Loading from '../../components/Loading';

export default function AddRoutine({ getData }) {

  const [info, setInfo] = useState()
  const [redirect, setRedirect] = useState()
  const [error, setError] = useState(false)
  const { currentUser } = useAuth()

  useEffect(() => {
    async function fetchData() {
      const data = await getData(currentUser.uid)
      setInfo(data.exercises)  
    }
    fetchData();
  }, [getData, currentUser.uid]) 

  function handleSubmit(e) {
    e.preventDefault();
    const newExercise = {
      name: e.target.name.value
    }
    if (info.find(item => item.name.toUpperCase() === newExercise.name.toUpperCase())) {
      setError(true)
    }
    if (!error) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/exercises/all/${currentUser.uid}`, newExercise)
        .then(response => {
          setRedirect(`/exercises/${response.data.id}`)
        })
    }
  }

  if (!info) {
    return <Loading />
  }
  if (redirect) {
    return <Redirect to={redirect} />
  }
  if (redirect) return <Redirect to={redirect} />
  return (
    <main className="add-exercise">
      <h1 className="add-exercise__heading">Add a New Exercise</h1>
      <form onSubmit={handleSubmit} className="add-exercise__form">
        <input className="add-exercise__input" name="name" placeholder="Name of Exercise" />
        <span className={error ? "add-exercise__error" : "hidden"}><img className="add-exercise__icon" src={errorIcon} alt="error icon" /> You already have an exercise with this name</span>
        <button className="add-exercise__button">Add</button>
      </form>
      <div className="add-exercise__form" >
        <Link to='/exercises' className="add-exercise__cancel">Cancel</Link>
      </div>
    </main>
  )
}