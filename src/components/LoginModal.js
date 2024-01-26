import { Modal, Tabs, Tab, Typography, Box } from '@mui/material'
import React, { useEffect, useState, useContext } from 'react'
import ModalImage from '../assets/img/modalimage.png'
import GooglePlay from '../assets/img/googleplay.png'
import AppStore from '../assets/img/appstore.png'
import { darkTheme } from './App'
import Login from './common/Login'
import Signup from './common/Signup'
import { BASEURL2 } from '../config/config'
import { AuthContext } from '../contexts/AuthProvider'
import { useNavigate } from 'react-router-dom'

function LoginModal({ open, handleClose }) {
  const [value, setValue] = useState(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const { webToken, login, logout } = useContext(AuthContext)

  const navigate = useNavigate()

  const signUpHandler = async function () {
    if (!name || !email || !password) return
    const user = {
      name,
      email,
      password,
      appType: 'music',
    }
    try {
      setIsLoading(true)
      const response = await fetch(`${BASEURL2}/signup`, {
        method: 'POST',
        headers: {
          projectId: 'g2l7ypns0olm',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...user }),
      })
      if (!response.ok) {
        throw new Error('Something went wrong during sign up.')
      }
      const data = await response.json()
      // console.log(data)
      const { token, status } = data
      login({ token, status })
    } catch (err) {
      setError(err.message)
      // console.error(err.message)
    } finally {
      setIsLoading(false)
      handleClose()
    }
    setName('')
    setEmail('')
    setPassword('')
  }

  const loginHandler = async function () {
    if (!email || !password) return
    const user = {
      email,
      password,
      appType: 'music',
    }
    try {
      setIsLoading(true)
      const response = await fetch(`${BASEURL2}/login`, {
        method: 'POST',
        headers: {
          projectId: 'g2l7ypns0olm',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...user }),
      })
      if (!response.ok) {
        throw new Error('Something went wrong during login.')
      }
      const data = await response.json()
      // console.log(data)
      const { token, status } = data
      login({ token, status })
    } catch (err) {
      setError(err.message)
      // console.error(err.message)
    } finally {
      setIsLoading(false)
      handleClose()
    }
    setName('')
    setEmail('')
    setPassword('')
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: '40em',
          maxHeight: '30em',
          backgroundColor: darkTheme.palette.background.default,
          color: '#272727',
          boxShadow: '0 0 0 500px #17191d',
          display: 'grid',
          gridTemplateColumns: '3fr 4fr',
          gridTemplateRows: '1fr',
          borderRadius: '1em',
          overflow: 'hidden',
        }}
      >
        <Box
          component={'img'}
          src={ModalImage}
          alt='Wynk promotion'
          maxHeight='480px'
        ></Box>
        <Box
          sx={{
            gridColumn: '2',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: darkTheme.palette.text.primary,
          }}
        >
          <Typography variant='body1'>
            Get a personalised experience, and access all your music
          </Typography>
          <Tabs
            centered
            value={value}
            onChange={(e, val) => {
              setValue(val)
            }}
          >
            <Tab label='Login' />
            <Tab label='Signup' />
          </Tabs>
          <Box borderTop={`1px solid ${darkTheme.palette.divider}`}>
            {value === 0 && (
              <Login
                email={email}
                onEmailUpdate={setEmail}
                password={password}
                onPasswordUpdate={setPassword}
                onClickHandler={loginHandler}
              />
            )}
            {value === 1 && (
              <Signup
                name={name}
                onNameUpdate={setName}
                email={email}
                onEmailUpdate={setEmail}
                password={password}
                onPasswordUpdate={setPassword}
                onClickHandler={signUpHandler}
              />
            )}
          </Box>
          <Box
            sx={{
              marginTop: 'auto',
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
            }}
          >
            <Typography variant='body2'>Available on</Typography>
            <Box component={'img'} src={GooglePlay} height='1.5rem' />
            <Box component={'img'} src={AppStore} height='1.5rem' />
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default LoginModal
