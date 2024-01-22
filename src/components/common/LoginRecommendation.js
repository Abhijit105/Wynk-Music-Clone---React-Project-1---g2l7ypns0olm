import { Person } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { darkTheme } from '../App'

function LoginRecommendation({ title }) {
  return (
    <Box
      border='1px solid #272727'
      padding='32px'
      display='flex'
      justifyContent='center'
      width='100%'
      marginBottom='1.5em'
      borderRadius='0.5em'
    >
      <Typography variant='h4'>{title}</Typography>
      <Box>
        <Typography
          variant='h5'
          display='flex'
          justifyContent='center'
          gap='1em'
          width='100%'
          marginBottom='0.5em'
        >
          <Person />
          Login to view your recommended songs
        </Typography>
        <Typography fontSize='12px' marginBottom='2em'>
          Login or sign up with your email to get personalised recommendations
          based on the music you have listened to across all your devices
        </Typography>
        <Box display='flex' justifyContent='center' gap='1em'>
          <Button
            variant='outlined'
            color={'inherit'}
            sx={{
              color: darkTheme.palette.text.secondary,
              borderRadius: '100px',
            }}
          >
            Don't have account?
          </Button>
          <Button
            variant='contained'
            sx={{
              color: darkTheme.palette.text.primary,
              borderRadius: '100px',
              background: 'linear-gradient(to bottom, #ff8c76, #ff0d55)',
            }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default LoginRecommendation
