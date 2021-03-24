import { Component } from 'react';

class Exercises extends Component {
  render() {
    return (
      <main className="main">
        <h1 className="main__heading">Exercises</h1>
          <div className="category__item">
            <p className="category__name">Squat</p>
          </div>
          <div className="category__item">
            <p className="category__name">Deadlift</p>
          </div>
          <div className="category__item">
            <p className="category__name">Bench Press</p>
          </div>
          <div className="category__item">
            <p className="category__name">Shoulder Press</p>
          </div>
          <div className="category__item">
            <p className="category__name">Bent Over Row</p>
          </div>
          <div className="category__item">
            <p className="category__name">Pull Ups</p>
          </div>
      </main>
    )
  }
}

export default Exercises