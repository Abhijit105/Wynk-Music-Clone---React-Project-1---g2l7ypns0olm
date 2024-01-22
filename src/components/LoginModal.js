import {
  Modal,
  TextField,
  Typography,
  Box,
  OutlinedInput,
  Button,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import ModalImage from '../assets/img/modalimage.png'
import GooglePlay from '../assets/img/googleplay.png'
import AppStore from '../assets/img/appstore.png'
import { darkTheme } from './App'

function LoginModal({ open, handleClose }) {
  const [displaySignUp, setDisplaySignUp] = useState(false)

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
          <Typography variant='h6' textAlign='center' margin={'1rem 2rem 3rem'}>
            Login/Signup
          </Typography>
          <Typography variant='body1'>
            Get a personalised experience, and access all your music
          </Typography>
          {!displaySignUp ? (
            <>
              <Box sx={{ marginBottom: '0.5em' }}>
                <OutlinedInput
                  size='small'
                  placeholder='Enter email'
                  sx={{
                    fontFamily: 'inherit',
                    color: 'inherit',
                    fontSize: 'inherit',
                    margin: '0.25em',
                    width: '100%',
                    borderRadius: '100px',
                  }}
                />
                <OutlinedInput
                  size='small'
                  placeholder='Enter password'
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
                  sx={{
                    backgroundColor: darkTheme.palette.action.active,
                    color: darkTheme.palette.background.default,
                  }}
                >
                  Login
                </Button>
                <Button
                  color='error'
                  variant='contained'
                  sx={{
                    backgroundColor: darkTheme.palette.background.default,
                    color: darkTheme.palette.text.secondary,
                  }}
                  onClick={() => setDisplaySignUp(true)}
                >
                  Sign Up
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Box sx={{ marginBottom: '0.5em' }}>
                <OutlinedInput
                  size='small'
                  placeholder='Enter email'
                  sx={{
                    fontFamily: 'inherit',
                    color: 'inherit',
                    fontSize: 'inherit',
                    margin: '0.25em',
                    width: '100%',
                    borderRadius: '100px',
                  }}
                />
                <OutlinedInput
                  size='small'
                  placeholder='Enter password'
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
                  sx={{
                    backgroundColor: darkTheme.palette.action.active,
                    color: darkTheme.palette.background.default,
                  }}
                >
                  Sign Up
                </Button>
                <Button
                  color='error'
                  variant='contained'
                  sx={{
                    backgroundColor: darkTheme.palette.background.default,
                    color: darkTheme.palette.text.secondary,
                  }}
                  onClick={() => setDisplaySignUp(false)}
                >
                  Login
                </Button>
              </Box>
            </>
          )}
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
