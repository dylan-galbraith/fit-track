import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './Routines.scss';
import { useAuth } from '../../contexts/AuthContext';

export default function Routines({ getData }) {

  const [info, setInfo] = useState()
  const { currentUser } = useAuth()

  useEffect(() => {
    async function fetchData() {
      const data = await getData(currentUser.uid)
      setInfo(data.routines)  
    }
    fetchData();
  }, [getData, currentUser.uid]) 

  if(!info) {
    return <p>Loading...</p>
  }

  return (
    <main className="routines">
      <h1 className="routines__heading">Routines</h1>
      <div className="routines__list">
        <Link to='/routines/add' className="routines__add">Add a New Routine!</Link>
        {info.map(item => {
          return <Link key={item.id} to={`/routines/${item.id}`} className= "routines__name">{item.name}</Link>
        })}
      </div>
    </main>
  )  
}