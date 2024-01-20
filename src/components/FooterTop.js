import { Box } from '@mui/material'
import React from 'react'
import FooterBox from './common/FooterBox'

function FooterTop() {
  const latestAlbums = [
    'Walkerworld',
    'Dunki',
    'Vikram Original Motion Picture Soundtrack',
    'Thallumaala',
    'Pushpa - The Rise',
    'Ninna Sanihake',
    'Praktan',
    'Still Rollin',
    'Bhavartha Mauli',
    'Yuva Sarkar',
    'Mal mahu jiban mati',
    "1989 (Taylor's Version)",
  ]

  return (
    <Box>
      <FooterBox title='Latest albums' data={latestAlbums} />
    </Box>
  )
}

export default FooterTop
