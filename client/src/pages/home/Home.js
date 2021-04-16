import './Home.scss';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function Home({ getData }) {

  const { currentUser, logout } = useAuth()
  const [info, setInfo] = useState()

  useEffect(() => {
    async function fetchData() {
      const data = await getData()
      setInfo(data)  
    }
    fetchData();
  }, []) 

  if(!info) {
    return <p>Loading...</p>
  }

  return(
    <main className="home">
      <h1 className="home__heading">Welcome, {currentUser.email}!</h1>
      <h3 className="home__category__heading">Routines</h3>
      <article className="home__category">
        <Link to='/routines/add' className={info.routines.length===0 ? "home__name home__name--top" : "hidden"}>Add a New Routine!</Link>
        {info.routines.map(item => {
          return <Link key={item.id} to={`/routines/${item.id}`} className={info.routines.indexOf(item)===0 ? "home__name home__name--top" : "home__name"}>{item.name}</Link>
        })}
      </article>
      <h3 className="home__category__heading">Favourites</h3>
      <article className="home__category">
        <Link to='/exercises' className={!info.exercises.find(item => item.favourite) ? "home__name home__name--top" : "hidden"}>Add a New Favourite!</Link>
        {info.exercises.filter(item => item.favourite).map(item => {
            return <Link key={item.id} to={`/exercises/${item.id}`} className={info.exercises.filter(item => item.favourite).indexOf(item)===0 ? "home__name home__name--top" : "home__name"}>{item.name}</Link>
          }
        )}
      </article>
    </main>
  )
}