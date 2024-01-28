import { AppBar, Box, Toolbar, Typography, createTheme } from '@mui/material'
import React, { useEffect } from 'react'
import { ReactComponent as WynkImage } from '../../assets/img/WynkImage.svg'
import { darkTheme } from '../App'
import UpaImage from '../../assets/img/upi.png'
import { ReactComponent as RibbonImage } from '../../assets/img/Ribbon.svg'

const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
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
    <>
      <AppBar sx={{ paddingY: '0.5em', marginBottom: '2em' }}>
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
        display={'grid'}
        gridTemplateColumns={'1fr 1fr'}
        columnGap={'4em'}
        color={'111'}
        sx={{ backgroundColor: '#fff', height: '100vh' }}
      >
        <Box marginTop={'10em'}>
          <Box border={`1px solid ${darkTheme.palette.divider}`}>
            <Box>
              <RibbonImage />
              <Typography
                textTransform={'uppercase'}
                color={darkTheme.palette.text.secondary}
              >
                Recommended Options
              </Typography>
            </Box>
            <Box>
              <Box component={'img'} url={UpaImage} />
              <Box>
                <Typography>VPA</Typography>
                <Typography
                  color={darkTheme.palette.text.secondary}
                  fontSize={'0.75em'}
                >
                  9876543210@airtel
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box border={`1px solid ${darkTheme.palette.divider}`}></Box>
          <Box border={`1px solid ${darkTheme.palette.divider}`}></Box>
        </Box>
        <Box></Box>
      </Box>
    </>
  )
}

export default Payment
