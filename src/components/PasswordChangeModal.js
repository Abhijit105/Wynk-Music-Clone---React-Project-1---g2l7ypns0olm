import React from 'react'
import { Modal, Box, Typography, TextField, Button } from '@mui/material'
import { darkTheme } from './App'
import ModalImage from '../assets/img/modalimage.png'
import { useState } from 'react'
import GooglePlay from '../assets/img/googleplay.png'
import AppStore from '../assets/img/appstore.png'
import { BASEURL2 } from '../config/config'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider'

function PasswordChangeModal({ open, handleClose }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [passwordCurrent, setPasswordCurrent] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { webToken, login } = useContext(AuthContext)

  const passwordChangeHandler = async function () {
    if (!name || !email || !passwordCurrent || !password) return
    const user = {
      name,
      email,
      passwordCurrent,
      password,
      appType: 'music',
    }
    try {
      setIsLoading(true)
      const response = await fetch(`${BASEURL2}/updateMyPassword`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${webToken.token}`,
          projectId: 'g2l7ypns0olm',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...user }),
      })
      if (!response.ok) {
        throw new Error('Something went wrong during password change.')
      }
      const data = await response.json()
      console.log(data)
      const { token, status } = data
      login({ token, status })
    } catch (err) {
      console.error(err.message)
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
          <Typography variant='body1' textTransform='uppercase'>
            Change Password
          </Typography>
          <Box borderTop={`1px solid ${darkTheme.palette.divider}`}>
            <Box
              sx={{ marginBottom: '0.5em' }}
              display='flex'
              flexDirection='column'
              alignItems='center'
            >
              <TextField
                size='small'
                placeholder='Enter name'
                type='text'
                value={name}
                onChange={e => setName(e.target.value)}
                sx={{
                  fontFamily: 'inherit',
                  color: 'inherit',
                  fontSize: 'inherit',
                  margin: '0.25em',
                  width: '100%',
                  borderRadius: '100px',
                }}
              />
              <TextField
                size='small'
                placeholder='Enter email'
                type='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                sx={{
                  fontFamily: 'inherit',
                  color: 'inherit',
                  fontSize: 'inherit',
                  margin: '0.25em',
                  width: '100%',
                  borderRadius: '100px',
                }}
              />
              <TextField
                size='small'
                placeholder='Enter current password'
                type='password'
                value={passwordCurrent}
                onChange={e => setPasswordCurrent(e.target.value)}
                sx={{
                  fontFamily: 'inherit',
                  color: 'inherit',
                  fontSize: 'inherit',
                  margin: '0.25em',
                  width: '100%',
                  borderRadius: '100px',
                }}
              />
              <TextField
                size='small'
                placeholder='Enter new password'
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                sx={{
                  fontFamily: 'inherit',
                  color: 'inherit',
                  fontSize: 'inherit',
                  margin: '0.25em',
                  width: '100%',
                  borderRadius: '100px',
                }}
              />
            </Box>
            <Box
              sx={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}
            >
              <Button
                color='error'
                variant='contained'
                onClick={passwordChangeHandler}
                sx={{
                  backgroundColor: darkTheme.palette.action.active,
                  color: darkTheme.palette.background.default,
                }}
              >
                Change Password
              </Button>
            </Box>
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

export default PasswordChangeModal
