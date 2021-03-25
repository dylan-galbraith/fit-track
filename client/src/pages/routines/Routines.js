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
      <main className="main">
        <h1 className="main__heading">Routines</h1>
        {this.state.routines.map(item => {
            return (
              <div className="category__item" key={item.id}>
                <Link to={`/routines/${item.id}`} className="category__name">{item.name}</Link>
              </div>
            )
          })}
      </main>
    )
  }
}

export default Routines