import React, { useContext } from 'react'
import { AuthContext } from './AuthProvider'
import { Navigate } from 'react-router-dom'

function RequireAuth({ children }) {
  const {webToken} = useContext(AuthContext)

  if (!webToken) {
    return <Navigate to='/login' />
  }

  return children
}

export default RequireAuth
