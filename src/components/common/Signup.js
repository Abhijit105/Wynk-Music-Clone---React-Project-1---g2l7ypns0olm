import React from 'react'
import { Box, TextField, Button } from '@mui/material'
import { darkTheme } from '../App'

function Signup({
  name,
  onNameUpdate,
  email,
  onEmailUpdate,
  password,
  onPasswordUpdate,
  onClickHandler,
}) {
  return (
    <>
      <Box sx={{ marginBottom: '0.5em' }}>
        <TextField
          size='small'
          placeholder='Enter name'
          type='text'
          value={name}
          onChange={e => onNameUpdate(e.target.value)}
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
      <Box sx={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Button
          color='error'
          variant='contained'
          onClick={onClickHandler}
          sx={{
            backgroundColor: darkTheme.palette.action.active,
            color: darkTheme.palette.background.default,
          }}
        >
          Sign Up
        </Button>
      </Box>
    </>
  )
}

export default Signup
