import { Box, Typography } from '@mui/material'
import React from 'react'
import { darkTheme } from './App'

function FooterBottom() {
  const currentYear = new Date().getFullYear()

  return (
    <Box display='flex' justifyContent='space-between' gap='12em'>
      <Typography fontSize='0.75em' color={darkTheme.palette.text.secondary}>
        Wynk Music is the one-stop music app for the latest to the greatest
        songs that you love. Play your favourite music online for free or
        download mp3. Enjoy from over 22 Million Hindi, English, Bollywood,
        Regional, Latest, Old songs and more.
      </Typography>
      <Typography
        fontSize='0.75em'
        color={darkTheme.palette.text.secondary}
        width='33em'
      >
        {currentYear} &copy; All rights reserved | Airtel Digital Limited
      </Typography>
    </Box>
  )
}

export default FooterBottom
