import axios from 'axios';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import addIcon from '../../assets/icons/add.svg';
import './Routines.scss';
import { API_URL } from '../../utils';

class Routines extends Component {

  state = {
    routines: []
  }

  componentDidMount = () => {
    axios
      .get(`${API_URL}/routines`)
      .then(response => {
        this.setState({
          routines: response.data
        })
      })
  }

  render() {
    return (
      <main className="routines">
        <h1 className="routines__heading">Routines <Link to="/routines/add"><img onClick={this.optionMenu} className="exercises__icon" src={addIcon} alt="add icon" /></Link></h1>
        <div className="routines__list">
          {this.state.routines.map(item => {
            return (
                <Link key={item.id} to={`/routines/${item.id}`} className={this.state.routines.indexOf(item)===0 ? "routines__name routines__name--top" : "routines__name"}>{item.name}</Link>
            )
          })}
        </div>
      </main>
    )
  }
}

export default Routines