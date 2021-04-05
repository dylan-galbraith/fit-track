import { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

import menuIcon from '../assets/icons/icons8-menu.svg';
import exitIcon from '../assets/icons/exit-icon.svg';

class Footer extends Component {

  state = {
    menuOpen: false
  }

  menuHandler = () => {
    this.setState({
      menuOpen: !this.state.menuOpen
    })
  }

  reset = () => {
    this.props.resetExercises();
    this.props.resetRoutines();
  }

  render() {
    if (this.state.menuOpen) {
      return (
        <section className="menu">
          <button onClick={this.props.logout} className="menu__logout">Log Out</button>
          <div className="menu__list">
            <NavLink className="menu__item" to='/routines' onClick={this.menuHandler}>Routines</NavLink>
            <NavLink className="menu__item" to='/favourites' onClick={this.menuHandler}>Favourites</NavLink>
            <NavLink className="menu__item" to='/exercises' onClick={this.menuHandler}>Exercises</NavLink>
            <NavLink className="menu__item" to='/' exact onClick={this.menuHandler}>Home</NavLink>
          </div>
          <footer className="footer">
            <Link className="footer__logo" to='/'  onClick={this.menuHandler}>FitTrack</Link>
            <img className="footer__icon" onClick={this.menuHandler} src={exitIcon} alt="menu icon" />
          </footer>
        </section>
      )
    }
    return (
      <footer className="footer">
        <Link onClick={this.reset} className="footer__logo" to='/'>FitTrack</Link>
        <img className="footer__icon" onClick={this.menuHandler} src={menuIcon} alt="menu icon" />
      </footer>
    )
  }
}

export default Footer; 