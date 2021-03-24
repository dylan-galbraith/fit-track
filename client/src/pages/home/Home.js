import { Component } from 'react';

class Home extends Component {
  render() {
    return(
      <main className="main">
        <h1 className="main__heading">Welcome, Dylan!</h1>
        <article className="category">
          <h3 className="category__heading">Routines</h3>
          <div className="category__item">
            <p className="category__name">Leg Day</p>
          </div>
          <div className="category__item">
            <p className="category__name">Chest Day</p>
          </div>
          <div className="category__item">
            <p className="category__name">Back Day</p>
          </div>
        </article>
        <article className="category">
          <h3 className="category__heading">Favourites</h3>
          <div className="category__item">
            <p className="category__name">Squat</p>
          </div>
          <div className="category__item">
            <p className="category__name">Deadlift</p>
          </div>
          <div className="category__item">
            <p className="category__name">Bench Press</p>
          </div>
        </article>
      </main>
    )
  }
}

export default Home;