import { Component } from 'react';
import { Link } from 'react-router-dom';
import filledStarIcon from '../../assets/icons/star.svg';
import addIcon from '../../assets/icons/add.svg';
import './Exercises.scss';

class Exercises extends Component {

  state = {
    search: ""
  }

  handleChange = (e) => {
    this.setState({
      search: e.target.value.toUpperCase()
    })
  }

  componentDidMount = () => {
    this.props.resetExercises();
  }

  render() {
    return (
      <main className="exercises">
        <h1 className="exercises__heading">Exercises <Link to="/exercises/add"><img className="exercises__icon" src={addIcon} alt="add icon" /></Link></h1>
        <div className="exercises__list">
          <input onChange={this.handleChange} className="exercises__search" placeholder="Search" />
          <Link to='/exercises/add' className="home__name home__name--top">Add a New Exercise!</Link>
          {this.props.exercises.map(item => {
            if (item.name.toUpperCase().includes(this.state.search)){
              return (
                <Link 
                  key={item.id} 
                  to={`/exercises/${item.id}`} 
                  className={this.props.exercises.indexOf(item)===0 ? "exercises__name exercises__name--top" : "exercises__name"}>
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
}

export default Exercises