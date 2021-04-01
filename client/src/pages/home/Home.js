import { Link } from 'react-router-dom';
import './Home.scss';

const Home = ({ user, routines, exercises }) => {
  return(
    <main className="home">
      <h1 className="home__heading">Welcome back, {user.firstName}!</h1>
      <h3 className="home__category__heading">Routines</h3>
      <article className="home__category">
        <Link to='/routines/add' className={routines.length===0 ? "home__name home__name--top" : "hidden"}>Add a New Routine!</Link>
        {routines.map(item => {
          return <Link key={item.id} to={`/routines/${item.id}`} className={routines.indexOf(item)===0 ? "home__name home__name--top" : "home__name"}>{item.name}</Link>
        })}
      </article>
      <h3 className="home__category__heading">Favourites</h3>
      <article className="home__category">
        <Link to='/exercises' className={!exercises.find(item => item.favourite) ? "home__name home__name--top" : "hidden"}>Add a New Favourite!</Link>
        {exercises.map(item => {
          if (item.favourite) {
            return (
              <Link key={item.id} to={`/exercises/${item.id}`} className={exercises.indexOf(item)===0 ? "home__name home__name--top" : "home__name"}>{item.name}</Link>
          )
          }
        })}
      </article>
    </main>
  )
}

export default Home;