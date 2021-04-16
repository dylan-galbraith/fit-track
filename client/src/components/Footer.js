import { NavLink, Link, useHistory } from 'react-router-dom';
import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext';

import menuIcon from '../assets/icons/icons8-menu.svg';
import exitIcon from '../assets/icons/exit-icon.svg';

export default function Footer() {

  const { currentUser, logout } = useAuth()
  const history = useHistory()
  const [open, setOpen] = useState(false)

  function menuHandler() {
    setOpen(!open)
  }

  async function handleLogout(e) {
    e.preventDefault();

    try {
      await logout()
      setOpen(false)
      history.pushState('/login')
    } catch {
    }
  }

  if (open && currentUser) {
    return (
      <section className="menu">
        <button onClick={handleLogout} className="menu__logout">Log Out</button>
        <div className="menu__list">
          <NavLink className="menu__item" to='/routines' onClick={menuHandler}>Routines</NavLink>
          <NavLink className="menu__item" to='/favourites' onClick={menuHandler}>Favourites</NavLink>
          <NavLink className="menu__item" to='/exercises' onClick={menuHandler}>Exercises</NavLink>
          <NavLink className="menu__item" to='/' exact onClick={menuHandler}>Home</NavLink>
        </div>
        <footer className="footer">
          <Link className="footer__logo" to='/'  onClick={menuHandler}>FitTrack</Link>
          <img className="footer__icon" onClick={menuHandler} src={exitIcon} alt="menu icon" />
        </footer>
      </section>
    )
  }
  return (
    <footer className="footer">
      <Link className="footer__logo" to='/'>FitTrack</Link>
      <img className={currentUser ? "footer__icon" : "hidden"} onClick={menuHandler} src={menuIcon} alt="menu icon" />
    </footer>
  )
}