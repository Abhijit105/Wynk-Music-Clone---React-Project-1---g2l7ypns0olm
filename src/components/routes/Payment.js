import {
  AppBar,
  Box,
  CssBaseline,
  IconButton,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from '@mui/material'
import React, { useEffect } from 'react'
import { ReactComponent as WynkImage } from '../../assets/img/WynkImage.svg'
import PaymentComponent1 from '../common/PaymentComponent1'

export const lightTheme = createTheme({
  palette: {
    background: {
      default: '#fff',
      paper: '#111',
    },
    text: {
      primary: '#111',
      secondary: 'rgb(0, 0, 0, 0.7)',
      disabled: 'rgb(0, 0, 0, 0.5)',
    },
    divider: 'rgb(0, 0, 0, 0.12)',
  },
})

function Payment() {
  useEffect(() => {
    document.querySelector('.app-bar-primary').style.display = 'none'
    document.querySelector('.app-bar-secondary').style.display = 'none'
    document.querySelector('.footer').style.display = 'none'
    document.querySelector('.audio-player-component').style.display = 'none'

    return () => {
      document.querySelector('.app-bar-primary').style.display = 'flex'
      document.querySelector('.app-bar-secondary').style.display = 'flex'
      document.querySelector('.footer').style.display = 'flex'
      document.querySelector('.audio-player-component').style.display = 'flex'
    }
  }, [])

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <AppBar
        sx={{
          paddingY: '0.5em',
          marginBottom: '2em',
          backgroundColor: lightTheme.palette.background.paper,
        }}
      >
        <Toolbar
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <WynkImage />
          <Typography
            fontSize={'1.25em'}
            sx={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            Pay Securely
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        width={'100%'}
        height={'100vh'}
        display={'grid'}
        gridTemplateColumns={'1fr 1fr'}
        justifyItems={'center'}
        columnGap={'4em'}
        color={'111'}
        sx={{ backgroundColor: '#fff', height: '100vh' }}
      >
        <Box
          marginTop={'8em'}
          width={'100%'}
          height={'100vh'}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          gap={'1em'}
        >
          <PaymentComponent1 />
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default Payment
