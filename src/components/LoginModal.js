import { Modal, Tabs, Tab, Typography, Box, Snackbar } from '@mui/material'
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
  const [message, setMessage] = useState('')
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [messageSnackbar, setMessageSnackbar] = useState('')

  const { webToken, login, logout } = useContext(AuthContext)

  const navigate = useNavigate()

  const onCloseHandler = function () {
    handleClose()
    setName('')
    setEmail('')
    setPassword('')
    setMessage('')
    setError('')
    setValue(0)
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnackbar(false)
  }

  const signUpHandler = async function () {
    if (!name || !email || !password) {
      setMessage('Enter all the fields')
      return
    }
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
      console.log(data)
      const { token, status } = data
      login({ token, status })
      setMessageSnackbar('sig up & login successful')
      setOpenSnackbar(true)
    } catch (err) {
      setError(err.message)
      // console.error(err.message)
    } finally {
      setIsLoading(false)
    }
    setName('')
    setEmail('')
    setPassword('')
  }

  const loginHandler = async function () {
    if (!email || !password) {
      setMessage('Enter all the fields')
      setError('')
      return
    }
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
      // console.log(response)
      if (!response.ok) {
        throw new Error('Something went wrong during login.')
      }
      const data = await response.json()
      // console.log(data)
      const { token, status } = data
      login({ token, status })
      setMessageSnackbar('login successful')
      setOpenSnackbar(true)
    } catch (err) {
      setError(err.message)
      // console.error(err.message)
    } finally {
      setIsLoading(false)
    }
    setEmail('')
    setPassword('')
  }

  useEffect(() => {
    if (!webToken) return

    onCloseHandler()
  }, [webToken])

  useEffect(() => {
    if (!error) return

    setMessage('Invalid username or password')
  }, [error])

  // console.log(error === '')

  return (
    <>
      <Modal open={open} onClose={onCloseHandler}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '41.67%',
            height: '68.18%',
            backgroundColor: darkTheme.palette.background.default,
            color: '#272727',
            boxShadow: '0 0 0 500px #17191d',
            display: 'grid',
            gridTemplateColumns: { xs: '1', md: '42.1875% 57.8125%' },
            gridTemplateRows: '100%',
            borderRadius: '1em',
            overflow: 'hidden',
            justifyContent: 'center',
          }}
        >
          <Box
            component={'img'}
            src={ModalImage}
            alt='Wynk promotion'
            width={'100%'}
            height={'100%'}
            display={{ xs: 'none', md: 'flex' }}
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
            <Typography variant='body1' display={{ xs: 'none', sm: 'flex' }}>
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
                  message={message}
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
                  message={message}
                />
              )}
            </Box>
            <Box
              sx={{
                marginTop: 'auto',
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: { xs: 'column', lg: 'row' },
                display: { xs: 'none', lg: 'flex' },
              }}
            >
              <Typography variant='body2'>Available on</Typography>
              <Box component={'img'} src={GooglePlay} height='1.5rem' />
              <Box component={'img'} src={AppStore} height='1.5rem' />
            </Box>
          </Box>
        </Box>
      </Modal>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={(event, reason) => handleCloseSnackbar(event, reason)}
        message={messageSnackbar}
      />
    </>
  )
}

export default LoginModal
