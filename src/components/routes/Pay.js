import { Box, CssBaseline, ThemeProvider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { lightTheme } from './Payment'
import { Check } from '@mui/icons-material'

function Pay() {
  const [displayLoader, setDisplayLoader] = useState(true)

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

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      {displayLoader && (
        <span className='loader' style={{ backgroundColor: '#111' }}></span>
      )}

      <Box
        height={'100vh'}
        display={'flex'}
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
      </Box>
    </ThemeProvider>
  )
}

export default Pay
