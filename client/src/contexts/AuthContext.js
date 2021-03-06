import React, { useContext, useState, useEffect } from 'react'
import { auth, provider , facebookProvider } from '../firebase'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signInWithGoogle() {
    auth.signInWithPopup(provider);
  };

  function signInWithFacebook() {
    auth.signInWithPopup(facebookProvider);
  };

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function signup(email, password, name) {
    return (
      auth.createUserWithEmailAndPassword(email, password)
      .then((response) => {
        console.log(response);
        response.user.updateProfile({displayName: name})
      })
    )
  }

  function logout() {
    return auth.signOut();
  }

  function updateName(name) {
    return currentUser.updateProfile({displayName: name})
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])



  const value = {
    currentUser,
    login,
    signup,
    logout,
    updateName,
    updateEmail,
    updatePassword,
    signInWithGoogle,
    signInWithFacebook
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
