import { Component } from 'react';

class Routines extends Component {
  render() {
    return (
      <main className="main">
        <h1 className="main__heading">Routines</h1>
          <div className="category__item">
            <p className="category__name">Leg Day</p>
          </div>
          <div className="category__item">
            <p className="category__name">Chest Day</p>
          </div>
          <div className="category__item">
            <p className="category__name">Back Day</p>
          </div>
          <div className="category__item">
            <p className="category__name">Shoulders/Arms</p>
          </div>
          <div className="category__item">
            <p className="category__name">Abs</p>
          </div>
      </main>
    )
  }
}

export default Routines