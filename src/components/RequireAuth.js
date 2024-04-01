import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider'
import { Navigate } from 'react-router-dom'

function RequireAuth({ children }) {
  const { webToken, user } = useContext(AuthContext)

  if (!webToken || !user) {
    return null
  }

  return children
}

export default RequireAuth
