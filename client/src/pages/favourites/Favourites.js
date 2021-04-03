import { Link } from 'react-router-dom';
import filledStarIcon from '../../assets/icons/star.svg';
import './Favourites.scss';

const Favourites = ({ exercises }) => {
  return (
    <div className="favourites">
      <h1 className="favourites__heading">Favourites</h1>
      <div className="favourites__list">
      <Link to='/exercises' className={!exercises.find(item => item.favourite) ? "home__name home__name--top" : "hidden"}>Add a New Favourite!</Link>
        {exercises.map(item => {
            return <Link key={item.id} to={`/exercises/${item.id}`} className={exercises.indexOf(item)===0 ? "favourites__name favourites__name--top" : "favourites__name"}>{item.name} <img className="favourites__icon" src={filledStarIcon} alt="favourite icon" /></Link>
        })}      
      </div>
    </div>
  )
}

export default Favourites;