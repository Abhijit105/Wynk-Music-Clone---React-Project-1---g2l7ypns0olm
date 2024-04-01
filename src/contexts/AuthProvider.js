import React, { createContext, useEffect } from 'react'
import { useState } from 'react'

export const AuthContext = createContext(null)

function AuthProvider({ children }) {
  const [webToken, setWebToken] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    setWebToken(JSON.parse(localStorage.getItem('webToken')))
    setUser(JSON.parse(localStorage.getItem('user')))
  }, [])

  const login = function (newWebToken) {
    setWebToken(newWebToken)
    localStorage.setItem('webToken', JSON.stringify(newWebToken))
  }

  const logout = function () {
    setWebToken(null)
    localStorage.setItem('webToken', JSON.stringify(null))
  }

  const createUser = function (newUser) {
    setUser(newUser)
    localStorage.setItem('user', JSON.stringify(newUser))
  }

  const deleteUser = function () {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider
      value={{ webToken, login, logout, user, createUser, deleteUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
