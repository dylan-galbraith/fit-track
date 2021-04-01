import { Link } from 'react-router-dom';
import './Home.scss';

const Home = ({ user, routines, exercises }) => {

  return(
    <main className="home">
      <h1 className="home__heading">Welcome back, {user.firstName}!</h1>
      <h3 className="home__category__heading">Routines</h3>
      <article className="home__category">
        {routines.map(item => {
          if (routines) {
            return <Link key={item.id} to={`/routines/${item.id}`} className={routines.indexOf(item)===0 ? "home__name home__name--top" : "home__name"}>{item.name}</Link>
          }  
        })}
      </article>
      <h3 className="home__category__heading">Favourites</h3>
      <article className="home__category">
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