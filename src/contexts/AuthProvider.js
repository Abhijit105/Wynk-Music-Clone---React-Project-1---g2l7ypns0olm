import React, { createContext, useEffect } from 'react'
import { useState } from 'react'

export const AuthContext = createContext(null)

function AuthProvider({ children }) {
  const [webToken, setWebToken] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    setWebToken(JSON.parse(localStorage.getItem('webToken')))
  }, [])

  const login = function (newWebToken) {
    setWebToken(newWebToken)
    localStorage.setItem('webToken', JSON.stringify(newWebToken))
  }

  const logout = function () {
    setWebToken(null)
    localStorage.setItem('webToken', JSON.stringify(null))
  }

  return (
    <AuthContext.Provider value={{ webToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
