import { Box } from '@mui/material'
import React from 'react'
import LoginRecommendation from '../common/LoginRecommendation'
import BestWay from '../common/BestWay'
import FeaturedSongs from '../common/FeaturedSongs'

function Top20() {
  return (
    <Box
      padding='100px'
      display='flex'
      flexDirection='column'
      alignItems='center'
      width='100%'
    >
      <FeaturedSongs
        title='Top 20 of this week'
        type='Top 20 of this week'
        numberOfSongs={20}
      />
      <LoginRecommendation />
      <BestWay />
    </Box>
  )
}

export default Top20
