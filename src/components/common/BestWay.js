import React from 'react'
import { Box, Typography } from '@mui/material'
import GooglePlay from '../../assets/img/googleplay.png'
import AppStore from '../../assets/img/appstore.png'
import Logo from '../../assets/logo/logo.png'
import { darkTheme } from '../App'

function BestWay() {
  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      width='100%'
      padding='2em'
      borderRadius='0.5em'
      marginBottom='4em'
      sx={{ backgroundColor: '#272727' }}
    >
      <Box
        display='grid'
        alignItems='center'
        justifyContent='center'
        gridTemplateColumns='4em 1fr'
        gridTemplateRows='1fr 1fr'
        columnGap='1em'
      >
        <Box
          component={'img'}
          src={Logo}
          alt='Wynk logo'
          maxWidth='4em'
          gridRow='1 / 3'
          gridColumn='1 / 2'
          borderRadius='100%'
        ></Box>

        <Typography variant='subtitle1' gridRow='1 / 2' gridColumn='2 / 3'>
          Best way to Listen to Music
        </Typography>
        <Typography variant='subtitle2' gridRow='2 / 3' gridColumn='2 / 3'>
          Don't forget to install Wynk Music on your mobile phones
        </Typography>
      </Box>
      <Box display='flex' gap='1em'>
        <Box
          component={'img'}
          src={GooglePlay}
          alt='Google Play'
          maxWidth='10em'
        ></Box>
        <Box
          component={'img'}
          src={AppStore}
          alt='App Store'
          maxWidth='10em'
        ></Box>
      </Box>
    </Box>
  )
}

export default BestWay
