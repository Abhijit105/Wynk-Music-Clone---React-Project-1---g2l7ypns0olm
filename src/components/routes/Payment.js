import {
  AppBar,
  Box,
  CssBaseline,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from '@mui/material'
import React, { useEffect } from 'react'
import { ReactComponent as WynkImage } from '../../assets/img/WynkImage.svg'
import PaymentComponent1 from '../common/PaymentComponent1'
import PaymentComponent2 from '../common/PaymentComponent2'
import PaymentComponent3 from '../common/PaymentComponent3'
import PaymentComponent4 from '../common/PaymentComponent4'
import PaymentComponent5 from '../common/PaymentComponent5'

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
              left: { xs: '100%', md: '50%' },
              transform: { xs: 'translateX(-120%)', md: 'translateX(-50%)' },
            }}
          >
            Pay Securely
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        width={'100%'}
        minHeight={'100vh'}
        display={'grid'}
        gridTemplateColumns={{ xs: '1fr', md: '3fr 2fr' }}
        columnGap={{ md: '2em', lg: '4em' }}
        sx={{ backgroundColor: '#fff', height: '100vh' }}
      >
        <Box
          marginTop={'10em'}
          width={'100%'}
          height={'100vh'}
          display={'flex'}
          flexDirection={'column'}
          alignItems={{ xs: 'center', md: 'flex-end' }}
          justifyContent={'flex-start'}
          gap={'1em'}
        >
          <PaymentComponent1 />
          <PaymentComponent2 />
          <PaymentComponent3 />
        </Box>
        <Box
          marginTop={'10em'}
          width={'100%'}
          height={'100vh'}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'flex-start'}
          gap={'1em'}
        >
          <PaymentComponent4 />
          <PaymentComponent5 />
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default Payment
