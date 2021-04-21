import './Home.scss';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';

export default function Home({ getData }) {

  const { currentUser } = useAuth()
  const [info, setInfo] = useState()

  useEffect(() => {
    async function fetchData() {
      const data = await getData(currentUser.uid)
      setInfo(data)  
    }
    fetchData();
  }, [getData, currentUser.uid]) 

  if(!info) {
    return <Loading />
  }

  return(
    <main className="home">
      <h1 className="home__heading">Welcome, {currentUser.displayName}!</h1>
      <div className="home__tablet">
        <div className="home__tablet__box">
          <h3 className="home__category__heading">Routines</h3>
          <article className="home__category">
            <Link to='/routines/add' className={info.routines.length===0 ? "home__name home__name--top" : "hidden"}>Add a New Routine!</Link>
            {info.routines.map(item => {
              return <Link key={item.id} to={`/routines/${item.id}`} className={info.routines.indexOf(item)===0 ? "home__name home__name--top" : "home__name"}>{item.name}</Link>
            })}
          </article>
        </div>
        <div className="home__tablet__box">
          <h3 className="home__category__heading">Favourites</h3>
          <article className="home__category">
            <Link to='/exercises' className={!info.exercises.find(item => item.favourite) ? "home__name home__name--top" : "hidden"}>Add a New Favourite!</Link>
            {info.exercises.filter(item => item.favourite).map(item => {
                return <Link key={item.id} to={`/exercises/${item.id}`} className={info.exercises.filter(item => item.favourite).indexOf(item)===0 ? "home__name home__name--top" : "home__name"}>{item.name}</Link>
              }
            )}
          </article>
        </div>
      </div>
    </main>
  )
}