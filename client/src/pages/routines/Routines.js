import axios from 'axios';
import { Component } from 'react';
import { Link } from 'react-router-dom';

class Routines extends Component {

  state = {
    routines: []
  }

  componentDidMount = () => {
    axios
      .get('http://localhost:8070/routines')
      .then(response => {
        this.setState({
          routines: response.data
        })
      })
  }

  render() {
    return (
      <main className="routines">
        <h1 className="routines__heading">Routines</h1>
        <div className="routines__list">
          {this.state.routines.map(item => {
            return (
                <Link to={`/routines/${item.id}`} className={this.state.routines.indexOf(item)===0 ? "routines__name routines__name--top" : "routines__name"}>{item.name}</Link>
            )
          })}
        </div>
      </main>
    )
  }
}

export default Routines