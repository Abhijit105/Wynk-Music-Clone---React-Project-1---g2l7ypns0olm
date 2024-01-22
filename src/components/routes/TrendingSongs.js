import { Box } from '@mui/material'
import React from 'react'
import LoginRecommendation from '../common/LoginRecommendation'
import BestWay from '../common/BestWay'
import FeaturedSongs from '../common/FeaturedSongs'

function TrendingSongs() {
  return (
    <Box
      padding='100px'
      display='flex'
      flexDirection='column'
      alignItems='center'
      width='100%'
    >
      <FeaturedSongs
        title='Trending Songs'
        type='Trending songs'
        numberOfSongs={30}
      />
      <LoginRecommendation />
      <BestWay />
    </Box>
  )
}

export default TrendingSongs
