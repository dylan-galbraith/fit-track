import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './Exercises.scss';
import filledStarIcon from '../../assets/icons/star.svg';
import { useAuth } from '../../contexts/AuthContext';

export default function Routines({ getData }) {

  const [info, setInfo] = useState()
  const [search, setSearch] = useState("")
  const { currentUser } = useAuth()

  useEffect(() => {
    async function fetchData() {
      const data = await getData(currentUser.uid)
      setInfo(data.exercises)  
    }
    fetchData();
  }, [getData, currentUser.uid]) 

  function handleChange(e) {
    setSearch(e.target.value.toUpperCase())
  }

  if(!info) {
    return <p>Loading...</p>
  }
  return (
    <main className="exercises">
      <h1 className="exercises__heading">Exercises</h1>
      <div className="exercises__list">
        <input onChange={handleChange} className="exercises__search" placeholder="Search" />
        <Link to='/exercises/add' className="exercises__add">Add a New Exercise!</Link>
        {info.map(item => {
          if (item.name.toUpperCase().includes(search)){
            return (
              <Link 
                key={item.id} 
                to={`/exercises/${item.id}`} 
                className="exercises__name">
                  {item.name} {item.favourite ? <img src={filledStarIcon} className="exercises__icon" alt="favourite icon" /> : null}
              </Link>
            )
          }
          return null
        })}
      </div>
    </main>
  )
}
