import { Component } from 'react';
import { Link } from 'react-router-dom';
import addIcon from '../../assets/icons/add.svg';
import './Routines.scss';

class Routines extends Component {

  componentDidMount = () => {
    this.props.resetRoutines();
  }

  render() {
    return (
      <main className="routines">
        <h1 className="routines__heading">Routines <Link to="/routines/add"><img className="exercises__icon" src={addIcon} alt="add icon" /></Link></h1>
        <div className="routines__list">
          <Link to='/routines/add' className="routines__name routines__name--top">Add a New Routine!</Link>
          {this.props.routines.map(item => {
            return <Link key={item.id} to={`/routines/${item.id}`} className= "routines__name">{item.name}</Link>
          })}
        </div>
      </main>
    )  
  }
}

export default Routines