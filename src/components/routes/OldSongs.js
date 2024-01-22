import { Box } from '@mui/material'
import React from 'react'
import LoginRecommendation from '../common/LoginRecommendation'
import BestWay from '../common/BestWay'
import FeaturedSongs from '../common/FeaturedSongs'

function OldSongs() {
  return (
    <Box
      padding='100px'
      display='flex'
      flexDirection='column'
      alignItems='center'
      width='100%'
    >
      <FeaturedSongs
        title='Evergreen Melodies'
        type='Evergreen melodies'
        numberOfSongs={30}
      />
      <LoginRecommendation />
      <BestWay />
    </Box>
  )
}

export default OldSongs
