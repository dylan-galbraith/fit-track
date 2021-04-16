import React, { useEffect, useState } from 'react';
import axios from 'axios';
import errorIcon from '../../assets/icons/alert-circle.svg';
import { Redirect } from 'react-router-dom';
import { API_URL } from '../../utils';
import { Link } from 'react-router-dom';

export default function AddRoutine({ getData }) {

  const [info, setInfo] = useState()
  const [redirect, setRedirect] = useState()
  const [error, setError] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const data = await getData()
      setInfo(data.routines)  
    }
    fetchData();
  }, []) 

  function handleSubmit(e) {
    e.preventDefault();
    const newRoutine = {
      name: e.target.name.value
    }
    if (info.find(item => item.name.toUpperCase() === newRoutine.name.toUpperCase())) {
      setError(true)
    }
    if (!error) {
      axios
        .post(`${API_URL}/routines/all/20`, newRoutine)
        .then(response => {
          setRedirect(`/routines/${response.data.id}`)
        })
    }
  }

  if (!info) {
    return <p>Loading...</p>
  }
  if (redirect) {
    return <Redirect to={redirect} />
  }
  return (
    <main className="add-routine">
      <h1 className="add-routine__heading">Add a New Routine</h1>
      <form onSubmit={handleSubmit} className="add-routine__form">
        <input className="add-routine__input" name="name" placeholder="Name of routine" />
        <span className={error ? "add-routine__error" : "hidden"}><img className="add-routine__icon" src={errorIcon} alt="error icon" /> You already have a routine with this name</span>
        <button className="add-routine__add">Add</button>
      </form>
      <div className="add-routine__form" >
        <Link to='/routines' className="add-routine__cancel">Cancel</Link>
      </div>
    </main>
  )
}