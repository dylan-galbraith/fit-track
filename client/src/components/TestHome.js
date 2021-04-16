import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

export default function TestHome() {

  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout(e) {
    e.preventDefault();
    setError('')

    try {
      await logout()
      history.pushState('/login')
    } catch {
      setError('Failed to log out')
    }
  }

  return (
    <div>
      Test Home Page
      <button onClick={handleLogout}>Log Out</button>
      <h1>{JSON.stringify(currentUser)}</h1>
      <h1>{currentUser.uid}</h1>
    </div>
  )
}
