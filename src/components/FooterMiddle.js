import { Box, Link, Typography } from '@mui/material'
import React from 'react'
import { darkTheme } from './App'
import { Facebook, Instagram, Twitter, YouTube } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { FOOTERMIDDLE } from '../config/config'

function FooterMiddle() {
  const navigate = useNavigate()

  const clickHandler = function () {
    navigate('/footerlink')
  }

  return (
    <Box
      marginBottom='2em'
      borderBottom={`1px solid ${darkTheme.palette.divider}`}
      borderTop={`1px solid ${darkTheme.palette.divider}`}
      padding='1em'
      display='flex'
      flexDirection={{ xs: 'column', sm: 'column', md: 'column', lg: 'row' }}
      gap={{ xs: '1em', sm: '1em', md: '1em', lg: '0' }}
      justifyContent='space-between'
      alignItems='center'
    >
      <Box
        display='flex'
        flexWrap={{ xs: 'wrap', sm: 'wrap', md: 'nowrap' }}
        justifyContent={'center'}
      >
        {FOOTERMIDDLE.map((item, i, arr) => (
          <Typography
            key={i}
            variant='body1'
            onClick={clickHandler}
            sx={{ cursor: 'pointer' }}
          >
            {item}
            &nbsp;{i === arr.length - 1 ? '' : '|'}&nbsp;
          </Typography>
        ))}
      </Box>
      <Box display='flex' gap='0.5em'>
        <Link href='https://www.facebook.com'>
          <Facebook sx={{ fontSize: '3em', cursor: 'pointer' }} />
        </Link>
        <Link href='https://www.twitter.com'>
          <Twitter sx={{ fontSize: '3em', cursor: 'pointer' }} />
        </Link>
        <Link href='https://www.instagram.com'>
          <Instagram sx={{ fontSize: '3em', cursor: 'pointer' }} />
        </Link>
        <Link href='https://www.youtube.com'>
          <YouTube sx={{ fontSize: '3em', cursor: 'pointer' }} />
        </Link>
      </Box>
    </Box>
  )
}

export default FooterMiddle
