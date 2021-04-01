import { Link } from 'react-router-dom';
import addIcon from '../../assets/icons/add.svg';
import './Routines.scss';

const Routines = ({ routines }) => {
  return (
    <main className="routines">
      <h1 className="routines__heading">Routines <Link to="/routines/add"><img className="exercises__icon" src={addIcon} alt="add icon" /></Link></h1>
      <div className="routines__list">
        {routines.map(item => {
          return (
              <Link key={item.id} to={`/routines/${item.id}`} className={routines.indexOf(item)===0 ? "routines__name routines__name--top" : "routines__name"}>{item.name}</Link>
          )
        })}
      </div>
    </main>
  )
}

export default Routines