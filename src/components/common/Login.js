import React from 'react'
import { Box, TextField, Button, Typography } from '@mui/material'

function Login({
  email,
  onEmailUpdate,
  password,
  onPasswordUpdate,
  onClickHandler,
  message,
}) {
  

  return (
    <>
      <Box sx={{ marginBottom: '0.5em' }}>
        <TextField
          size='small'
          placeholder='Enter email'
          type='email'
          value={email}
          onChange={e => onEmailUpdate(e.target.value)}
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
          placeholder='Enter password'
          type='password'
          value={password}
          onChange={e => onPasswordUpdate(e.target.value)}
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
          gap: '0.25rem',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1em',
        }}
      >
        <Button
          color='inherit'
          variant='contained'
          onClick={onClickHandler}
        >
          Login
        </Button>
        <Typography>{message}</Typography>
      </Box>
    </>
  )
}

export default Login
