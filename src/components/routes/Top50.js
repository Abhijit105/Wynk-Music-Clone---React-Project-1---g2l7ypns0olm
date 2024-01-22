import { Box } from '@mui/material'
import React from 'react'
import LoginRecommendation from '../common/LoginRecommendation'
import BestWay from '../common/BestWay'
import FeaturedSongs from '../common/FeaturedSongs'

function Top50() {
  return (
    <Box
      padding='100px'
      display='flex'
      flexDirection='column'
      alignItems='center'
      width='100%'
    >
      <FeaturedSongs
        title='Top 50 of this month'
        type='Top 50 of this month'
        numberOfSongs={50}
      />
      <LoginRecommendation />
      <BestWay />
    </Box>
  )
}

export default Top50
