import React, { useEffect } from 'react'
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
} from '@mui/material'
import { darkTheme } from './App'
import ModalImage from '../assets/img/modalimage.png'
import { useState } from 'react'
import { BASEURL2, PROJECTID } from '../config/config'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider'
import { useMutation } from '@tanstack/react-query'
import { FavoriteContext } from '../contexts/FavoriteProvider'

function PasswordChangeModal({ open, handleClose }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [passwordCurrent, setPasswordCurrent] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [messageSnackbar, setMessageSnackbar] = useState('')

  const { webToken, login } = useContext(AuthContext)
  const { setRefetchLikedSongs } = useContext(FavoriteContext)

  const onCloseHandler = function () {
    handleClose()
    setName('')
    setEmail('')
    setPasswordCurrent('')
    setPassword('')
    setMessage('')
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnackbar(false)
  }

  const {
    mutate: mutate,
    isLoading: isLoading,
    isPending: isPending,
    isError: isError,
    error: error,
    data: data,
  } = useMutation({
    mutationFn: async user => {
      const response = await fetch(`${BASEURL2}/updateMyPassword`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${webToken.token}`,
          projectId: PROJECTID,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...user }),
      })
      if (!response.ok) {
        throw new Error('Something went wrong during password change.')
      }
      const data = await response.json()
      // console.log(data)
      const { token, status } = data
      login({ token, status })
      setRefetchLikedSongs(true)
      return data
    },
    onSuccess: response => {
      // console.log(response)
      if (response.status === 'success') {
        setMessageSnackbar('password change successful')
        setOpenSnackbar(true)
      }
    },
    onError: error => {
      setMessageSnackbar(error.message)
      setOpenSnackbar(true)
    },
  })

  const passwordChangeHandler = function () {
    if (!name || !email || !passwordCurrent || !password) {
      setMessage('Enter all the fields')
      return
    }
    const user = {
      name,
      email,
      passwordCurrent,
      password,
      appType: 'music',
    }
    mutate(user)
  }

  useEffect(() => {
    if (!webToken) return

    onCloseHandler()
  }, [webToken])

  useEffect(() => {
    if (!error) return

    setMessage('Invalid email and/or current password')
  }, [error])

  return (
    <>
      <Modal open={open} onClose={onCloseHandler}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '58.33%', md: '41.67%' },
            height: '68.18%',
            backgroundColor: darkTheme.palette.background.default,
            color: '#272727',
            boxShadow: '0 0 0 500px #17191d',
            display: 'grid',
            gridTemplateColumns: { xs: '1', lg: '42.1875% 57.8125%' },
            gridTemplateRows: '100%',
            borderRadius: '1em',
            overflow: 'hidden',
            overflowY: 'auto',
            justifyContent: 'center',
          }}
        >
          <Box
            component={'img'}
            src={ModalImage}
            alt='Wynk promotion'
            width={'100%'}
            height={'100%'}
            display={{ xs: 'none', lg: 'flex' }}
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
            <Typography
              variant='body1'
              textTransform='uppercase'
              textAlign={'center'}
            >
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
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25em',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '1em',
                }}
              >
                <Button
                  color='inherit'
                  variant='contained'
                  onClick={passwordChangeHandler}
                >
                  Change Password
                </Button>
                <Typography>{message}</Typography>
              </Box>
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

export default PasswordChangeModal
