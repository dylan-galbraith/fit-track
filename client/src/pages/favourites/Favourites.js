import filledStarIcon from '../../assets/icons/star.svg';
import './Favourites.scss';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Loading from '../../components/Loading';

export default function Home({ getData }) {

  const [info, setInfo] = useState()
  const { currentUser } = useAuth()

  useEffect(() => {
    async function fetchData() {
      const data = await getData(currentUser.uid)
      setInfo(data.exercises)  
    }
    fetchData();
  }, [getData, currentUser]) 

  if(!info) {
    return <Loading />
  }  return (
    <div className="favourites">
      <h1 className="favourites__heading">Favourites</h1>
      <div className="favourites__list">
      <Link to='/exercises' className={!info.find(item => item.favourite) ? "home__name home__name--top" : "hidden"}>Add a New Favourite!</Link>
        {info.filter(item => item.favourite).map(item => {
            return <Link key={item.id} to={`/exercises/${item.id}`} className={info.filter(item => item.favourite).indexOf(item)===0 ? "favourites__name favourites__name--top" : "favourites__name"}>{item.name} <img className="favourites__icon" src={filledStarIcon} alt="favourite icon" /></Link>
        })}      
      </div>
    </div>
  )
}