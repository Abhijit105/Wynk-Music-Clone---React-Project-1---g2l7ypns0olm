import { Box, CssBaseline, ThemeProvider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { lightTheme } from './Payment'
import { Check } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

function Pay() {
  const [displayLoader, setDisplayLoader] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    document.querySelector('.app-bar-primary').style.display = 'none'
    document.querySelector('.app-bar-secondary').style.display = 'none'
    document.querySelector('.footer').style.display = 'none'
    document.querySelector('.audio-player-component').style.display = 'none'

    return () => {
      document.querySelector('.app-bar-primary').style.display = 'flex'
      document.querySelector('.app-bar-secondary').style.display = 'flex'
      document.querySelector('.footer').style.display = 'block'
      document.querySelector('.audio-player-component').style.display = 'flex'
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayLoader(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (displayLoader) return

    const timer = setTimeout(() => {
      navigate('/', { replace: true })
    }, 5000)

    return () => clearTimeout(timer)
  }, [displayLoader])

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      {displayLoader && (
        <span className='loader' style={{ backgroundColor: '#111' }}></span>
      )}

      <Box
        height={'100vh'}
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Box
          width={'50%'}
          height={'50%'}
          border={'2px double #111'}
          borderRadius={'1em'}
          display={'flex'}
          flexDirection={{ xs: 'column', sm: 'row' }}
          gap={'1em'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          {displayLoader ? (
            <span className='loader-artist'></span>
          ) : (
            <Check
              sx={{
                backgroundColor: '#4caf50',
                borderRadius: '50%',
                color: lightTheme.palette.background.default,
                width: '2em',
                height: '2em',
              }}
            />
          )}
          <Typography
            variant='h6'
            fontWeight={'bold'}
            textAlign={{ xs: 'center', sm: 'start' }}
          >
            {displayLoader ? 'Processing Payment' : 'Payment Successful'}
          </Typography>
        </Box>
        {!displayLoader && (
          <Typography
            fontWeight={'bold'}
            textAlign={'center'}
            fontSize={'large'}
          >
            Redirecting to home...
          </Typography>
        )}
      </Box>
    </ThemeProvider>
  )
}

export default Pay
